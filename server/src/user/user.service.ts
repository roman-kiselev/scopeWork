import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { NameList } from 'src/name_list/name-list.model';
import { Objects } from 'src/objects/objects.model';
import { Roles } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { UserRole } from 'src/roles/user-role.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { TableAddingData } from 'src/table-adding-data/table-adding-data.model';
import { UserDescription } from 'src/user-description/user-description.model';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Objects) private objectRepository: typeof Objects,
    @InjectModel(ScopeWork) private scopeWorkRepository: typeof ScopeWork,
    @InjectModel(NameList) private nameListRepository: typeof NameList,
    @InjectModel(Roles) private rolesRepository: typeof Roles,
    @InjectModel(UserRole) private userRoleRepository: typeof UserRole,
    @InjectModel(ListNameWork)
    private listNameWorkRepository: typeof ListNameWork,
    @InjectModel(UserDescription)
    private userDescriptionRepository: typeof UserDescription,
    @InjectModel(TableAddingData)
    private tableAddingRepository: typeof TableAddingData,
    private rolesService: RolesService,
  ) {}
  // Создаём администратора
  async createAdmin(dto: CreateUserDto) {
    try {
      const role = await this.rolesService.findRoleByName('admin');
      if (!role) {
        throw new HttpException('Роль не существует', HttpStatus.BAD_REQUEST);
      }
      const [admin, created] = await this.userRepository.findOrCreate({
        where: {
          email: dto.email,
        },
        defaults: {
          password: dto.password,
        },
      });
      if (!created) {
        throw new HttpException(
          'Пользователь существует',
          HttpStatus.BAD_REQUEST,
        );
      }
      await admin.$set('roles', [role.id]);
      admin.roles = [role];
      return admin;
    } catch (e) {
      console.log(
        new HttpException(
          e.message || 'Ошибка',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      return new HttpException(
        e.message || 'Ошибка',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // Создаём пользователя
  async createUser(dto: CreateUserDto) {
    try {
      const role = await this.rolesService.findRoleByName('user');
      if (!role) {
        throw new HttpException('Роль не существует', HttpStatus.BAD_REQUEST);
      }
      const [user, created] = await this.userRepository.findOrCreate({
        where: {
          email: dto.email,
        },
        defaults: {
          password: dto.password,
        },
      });
      if (!created) {
        return new HttpException(
          'Пользователь существует',
          HttpStatus.BAD_REQUEST,
        );
      }
      await user.$set('roles', [role.id]);
      user.roles = [role];
      return user;
    } catch (e) {
      console.log(
        new HttpException(
          e.message || 'Ошибка',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      return new HttpException(
        e.message || 'Ошибка',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //  Поиск по login пользователя
  async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email,
        },
        include: {
          model: Roles,
          through: {
            attributes: [],
          },
        },
      });

      if (!user) {
        throw new HttpException(
          'Пользователя с таким логином не существует',
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (e) {
      console.log(
        new HttpException(
          e.message || 'Ошибка',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      throw new HttpException(
        e.message || 'Ошибка',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return false;
      }
      return true;
    } catch (e) {
      console.log(
        new HttpException(
          e.message || 'Ошибка',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      throw new HttpException(
        e.message || 'Ошибка',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
        include: [
          {
            model: UserDescription,
          },
          {
            model: Roles,
            through: {
              attributes: [],
            },
          },
        ],
      });
      if (!user) {
        throw new HttpException(
          'Пользователя с таким id не существует',
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Получим всех пользователей
  async getAllUsers() {
    try {
      const users = await this.userRepository.findAll({
        include: { all: true },
      });
      return users;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Получим все объёмы работ
  async getAllScopeWorkForOneUser(id: number) {
    try {
      // const users = await this.userRepository.findOne({
      //   where: {
      //     id,
      //   },
      //   include: [
      //     {
      //       model: ScopeWork,
      //       through: {
      //         attributes: [],
      //       },
      //     },
      //   ],
      // });
      // const { scopeWork } = users;
      const tableAdding = await this.tableAddingRepository.findAll({
        where: {
          userId: id,
        },
        group: ['scopeWorkId'],
      });
      if (tableAdding) {
        let data: ScopeWork[] = [];
        for (const { scopeWorkId } of tableAdding) {
          const scopeWork = await this.scopeWorkRepository.findByPk(
            scopeWorkId,
          );
          data.push(scopeWork);
        }
        return data;
      } else {
        return [];
      }
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Поулчим все объекты для пользователя
  async getAllObjectsForOneUser(id: number) {
    try {
      const scopeWork = await this.getAllScopeWorkForOneUser(id);
      // Все id объектов
      const objectsId = scopeWork.map((item) => item.objectId);
      // Получим объекты
      const arrObjects: Objects[] = [];
      for (const item of objectsId) {
        const object = await this.objectRepository.findByPk(item);
        arrObjects.push(object);
      }

      return arrObjects;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Получаем все списки для одного пользователя
  async getAllListsForOneUser(id: number) {
    try {
      const scopeWorks = (await this.getAllScopeWorkForOneUser(id)).map(
        (item) => item.id,
      );
      // Далее получаем все списки для пользователя
      let listArr = [];
      for (const item of scopeWorks) {
        const list = await this.listNameWorkRepository.findAll({
          where: {
            scopeWorkId: item,
          },
        });
        listArr = [...listArr, ...list];
      }

      return listArr;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Получим по idUser объект
  // 1. Количество наименований общее в объёме
  // 2. Количество выполненых userом
  // 3. Процент выполненый userом
  // 4. Процент выполнения объёма
  async getStatisticsOneScopeWork(id: number, userId: string) {
    try {
      // Получаем для одного объёма статистику
      const scopeWork = await this.scopeWorkRepository.findByPk(id, {
        include: { all: true },
      });
      const { listNameWork, tableAddingData } = scopeWork;
      let arrNames = [];
      for (const item of listNameWork) {
        const arr = await this.nameListRepository.findAll({
          where: {
            listNameWorkId: item.id,
          },
        });
        arrNames = [...arrNames, ...arr];
      }
      // Получим общее количество
      const mainCount = arrNames
        .map((item) => item.quntity)
        .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
      // Получим общее количество изменений
      const countTableAddingData = tableAddingData
        .map((item) => item.quntity)
        .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
      // Сортируем по одному пользователю
      const tableAddingOneUser = tableAddingData.filter(
        (item) => item.userId === Number(userId),
      );
      // Количество внесённых данных одним пользователем
      const countOneUser = tableAddingOneUser
        .map((item) => item.quntity)
        .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
      // Получим процент для одного пользователя от объёма
      const percentOneUserForTotalVolume = (
        (countOneUser / mainCount) *
        100
      ).toFixed(1);

      const percentOneUserCompletedVolume = (
        (countOneUser / countTableAddingData) *
        100
      ).toFixed(1);
      return {
        mainCount,
        countTableAddingData,
        percentAll: ((countTableAddingData / mainCount) * 100).toFixed(1),
        countUser: countOneUser,
        percentOneUserForTotalVolume,
        percentOneUserCompletedVolume,
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getStatisticsOneUser(id: string) {
    try {
      const scopeWorks = await this.getAllScopeWorkForOneUser(Number(id));
      // Создаём массив с данными
      const arr = [];
      for (const item of scopeWorks) {
        const statistics = await this.getStatisticsOneScopeWork(item.id, id);
        const finishItem = JSON.parse(JSON.stringify(item));
        const finishStatistics = JSON.parse(JSON.stringify(statistics));
        arr.push({
          ...finishItem,
          ...finishStatistics,
        });
      }

      return arr;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllUserWithData() {
    try {
      const allUsers = await this.userRepository.findAll({
        include: [
          {
            model: UserDescription,
          },
        ],
      });
      console.log(allUsers);
      const finishArr = [];
      for (const item of allUsers) {
        const { id, userDescription, scopeWork, tableAddingData } = item;
        // Получим объекты
        const objects = await this.getAllObjectsForOneUser(id);
        const scopeWorkPlusData = await this.getStatisticsOneUser(
          id.toString(),
        );
        finishArr.push({
          id: item.id,
          email: item.email,
          banned: item.banned,
          firstName: userDescription.firstname,
          lastName: userDescription.lastname,
          scopeWorkPlusData,
          objects,
        });
      }
      return finishArr;
    } catch (e) {
      console.log(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editUser(userId: number, dto: EditUserDto) {
    try {
      const { firstname, lastname, email, password, banned } = dto;
      // 1. Изменяем user
      // 2. Изменяем user-description
      const user = await this.userRepository.findByPk(userId, {
        include: [
          {
            model: UserDescription,
          },
        ],
      });
      const { userDescription } = user;
      const newUserDescription = await this.userDescriptionRepository.findByPk(
        userDescription.id,
      );
      userDescription.firstname = firstname;
      userDescription.lastname = lastname;
      await userDescription.save();

      return user;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateRolesForUser(id: string, roles: string[]) {
    try {
      const user = await this.userRepository.findByPk(id);
      const rolesList: Roles[] = [];
      for (const item of roles) {
        const role = await this.rolesRepository.findOne({
          where: { name: item },
        });
        rolesList.push(role);
      }
      // Получим все id role для пользователя
      const currentRolesForUser = await this.userRoleRepository.findAll({
        where: { userId: id },
      });

      const sendedRolesListNumber = rolesList
        .map((item) => item.id)
        .sort((a, b) => a - b);
      const currentRolesForUserNumber = currentRolesForUser
        .map((item) => item.roleId)
        .sort((a, b) => a - b);

      if (sendedRolesListNumber.length >= currentRolesForUserNumber.length) {
        for (const item in sendedRolesListNumber) {
          if (
            !currentRolesForUserNumber.includes(sendedRolesListNumber[item])
          ) {
            // Если отправленной роли нет, добавляем
            console.log(`1 - ${sendedRolesListNumber[item]}`);
            const role = await this.rolesRepository.findByPk(
              sendedRolesListNumber[item],
            );
            await user.$add('roles', [role.id]);
            user.roles = [role];
          }
        }
      }

      if (currentRolesForUserNumber.length > sendedRolesListNumber.length) {
        for (const item in currentRolesForUserNumber) {
          if (
            !sendedRolesListNumber.includes(currentRolesForUserNumber[item])
          ) {
            // Если отправленной роли нет, удаляем
            const role = await this.rolesRepository.findByPk(
              currentRolesForUserNumber[item],
            );
            await user.$remove('roles', [role.id]);
            user.roles = [role];
          }
        }
      }

      const userFinish = this.userRepository.findByPk(id, {
        include: [{ model: Roles }],
      });

      return userFinish;
      // console.log(sendedRolesListNumber);
      // console.log(currentRolesForUserNumber);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
