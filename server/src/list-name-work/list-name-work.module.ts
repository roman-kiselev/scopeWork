import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NameWork } from 'src/name-work/entities/name-work.model';
import { NameList } from 'src/name_list/entities/name-list.model';
import { NameListModule } from 'src/name_list/name_list.module';
import { ScopeWork } from 'src/scope-work/entities/scope-work.model';
import { TypeWork } from 'src/type-work/entities/type-work.model';
import { ListNameWork } from './entities/list-name-work.model';
import { ListNameWorkController } from './list-name-work.controller';
import { ListNameWorkService } from './list-name-work.service';

@Module({
    controllers: [ListNameWorkController],
    providers: [ListNameWorkService],
    imports: [
        SequelizeModule.forFeature([
            ListNameWork,
            TypeWork,
            NameWork,
            NameList,
            ScopeWork,
        ]),
        NameListModule,
    ],
    exports: [ListNameWorkService, SequelizeModule.forFeature([ListNameWork])],
})
export class ListNameWorkModule {}
