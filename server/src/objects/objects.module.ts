import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { IamModule } from 'src/iam/iam.module';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { NameList } from 'src/name_list/name-list.model';
import { RedisModule } from 'src/redis/redis.module';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { TableAddingData } from 'src/table-adding-data/table-adding-data.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { TypeWorkModule } from 'src/type-work/type-work.module';
import { User } from 'src/user/user.model';
import { ObjectTypeWork } from './objects-type_work.model';
import { ObjectsController } from './objects.controller';
import { Objects } from './objects.model';
import { ObjectsService } from './objects.service';

@Module({
    controllers: [ObjectsController],
    providers: [ObjectsService],
    imports: [
        forwardRef(() => TypeWorkModule),
        SequelizeModule.forFeature([
            Objects,
            TypeWork,
            ObjectTypeWork,
            ScopeWork,
            NameList,
            User,
            TableAddingData,
            ListNameWork,
        ]),
        RedisModule,
        IamModule,
    ],
    exports: [ObjectsService],
})
export class ObjectsModule {}
