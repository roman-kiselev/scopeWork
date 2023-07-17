import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from './roles.model';
import { User } from 'src/user/user.model';
import { UserRole } from './user-role.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Roles, User, UserRole])],
  exports: [RolesService],
})
export class RolesModule {}
