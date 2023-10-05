import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Roles } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRole } from 'src/roles/user-role.model';
import { UserScopeWork } from 'src/scope-work/user-scope-work.model';
import { TableAddingData } from 'src/table-adding-data/table-adding-data.model';
import { UserDescription } from 'src/user-description/user-description.model';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    SequelizeModule.forFeature([
      User,
      Roles,
      UserRole,
      UserDescription,
      UserScopeWork,
      TableAddingData,
    ]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
