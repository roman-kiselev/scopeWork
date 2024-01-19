import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from './roles.model';
import { UserRole } from './user-role.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles) private rolesRepository: typeof Roles,
    @InjectModel(UserRole) private userRoleRepository: typeof UserRole,
  ) {}

  private async checkRole(name: string) {
    try {
      const role = await this.rolesRepository.findOne({
        where: {
          name,
        },
      });
      if (!role) {
        return false;
      }
      return true;
    } catch (e) {
      throw new NotFoundException(e.message || 'Произошла ошибка');
    }
  }

  async findRoleByName(name: string) {
    try {
      const role = await this.rolesRepository.findOne({
        where: {
          name,
          deletedAt: null,
        },
      });
      if (!role) {
        throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND);
      }

      return role;
    } catch (e) {
      throw new NotFoundException(e.message || 'Произошла ошибка');
    }
  }

  async createRole(dto: CreateRoleDto) {
    try {
      const [role, created] = await this.rolesRepository.findOrCreate({
        where: {
          name: dto.name,
          deletedAt: null,
        },
        defaults: {
          description: dto.description,
        },
      });
      if (!created) {
        throw new HttpException('Роль существует', HttpStatus.BAD_REQUEST);
      }
      return role;
    } catch (e) {
      console.log(
        new HttpException(
          e.message || 'Произошла ошибка',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      return new HttpException(
        e.message || 'Произошла ошибка',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllRoles() {
    try {
      const roles = await this.rolesRepository.findAll({
        where: {
          deletedAt: null,
        },
      });
      return roles;
    } catch (e) {
      throw new NotFoundException(e.message || 'Произошла ошибка');
    }
  }

  async getRoleById(id: number) {
    try {
      const role = await this.rolesRepository.findByPk(id);
      if (!role) {
        throw new NotFoundException('Роль не найдена');
      }
      return role;
    } catch (e) {
      throw new NotFoundException(e.message || 'Произошла ошибка');
    }
  }

  async deleteRole(id: number) {
    try {
      const role = await this.getRoleById(id);
      if (!role) {
        throw new NotFoundException('Роль не найдена');
      }
      const delRole = await Roles.destroy({ where: { id } });
      return delRole;
    } catch (e) {
      throw new NotFoundException(e.message || 'Произошла ошибка');
    }
  }

  async updateRole(id: number, dto: CreateRoleDto) {
    try {
      const role = await this.getRoleById(id);
      role.name = dto.name ? dto.name : role.name;
      role.description = dto.description ? dto.description : role.description;
      await role.save();
      return role;
    } catch (e) {
      throw new NotFoundException(e.message || 'Произошла ошибка');
    }
  }

  async getAllRolesByUserId(id: number) {
    try {
      const roles = await this.userRoleRepository.findAll({
        where: {
          userId: id,
        },
      });

      const listRoles: Roles[] = [];
      for (const { roleId } of roles) {
        const role = await this.rolesRepository.findByPk(roleId);
        listRoles.push(role);
      }

      return listRoles;
    } catch (e) {
      throw new NotFoundException(e.message || 'Произошла ошибка');
    }
  }
}
