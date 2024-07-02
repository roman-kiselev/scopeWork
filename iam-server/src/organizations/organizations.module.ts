import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Organization } from './entities/organization.entity';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

@Module({
    controllers: [OrganizationsController],
    providers: [OrganizationsService],
    imports: [
        TypeOrmModule.forFeature([Organization]),
        forwardRef(() => UsersModule),
    ],
    exports: [TypeOrmModule.forFeature([Organization]), OrganizationsService],
})
export class OrganizationsModule {}
