import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { NameList } from 'src/name_list/name-list.model';
import { Objects } from 'src/objects/objects.model';
import { Roles } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRole } from 'src/roles/user-role.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { UserScopeWork } from 'src/scope-work/user-scope-work.model';
import { DelTableAddingData } from 'src/table-adding-data/del-table-adding-data.model';
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
            Objects,
            ListNameWork,
            ScopeWork,
            NameList,
            DelTableAddingData,
        ]),
        RolesModule,
    ],
    exports: [UserService, SequelizeModule.forFeature([User])],
})
export class UserModule {}
