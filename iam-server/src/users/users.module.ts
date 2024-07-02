import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { RolesModule } from 'src/roles/roles.module';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => OrganizationsModule),
        RolesModule,
    ],
    exports: [TypeOrmModule.forFeature([User]), UsersService],
})
export class UsersModule {}
