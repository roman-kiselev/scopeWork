import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListNameWork } from 'src/list-name-work/entities/list-name-work.model';
import { NameWork } from 'src/name-work/name-work.model';
import { TableAddingData } from 'src/table-adding-data/entities/table-adding-data.model';
import { NameList } from './entities/name-list.model';
import { NameListController } from './name_list.controller';
import { NameListService } from './name_list.service';

@Module({
    controllers: [NameListController],
    providers: [NameListService],
    imports: [
        SequelizeModule.forFeature([
            NameList,
            ListNameWork,
            TableAddingData,
            NameWork,
        ]),
    ],
    exports: [NameListService, SequelizeModule.forFeature([NameList])],
})
export class NameListModule {}
