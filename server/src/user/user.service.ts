import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
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
}
