import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NameWork } from 'src/name-work/entities/name-work.model';
import { NameWorkModule } from 'src/name-work/name-work.module';
import { TableAddingData } from 'src/table-adding-data/entities/table-adding-data.model';
import { NameList } from './entities/name-list.model';
import { NameListController } from './name_list.controller';
import { NameListService } from './name_list.service';

@Module({
    controllers: [NameListController],
    providers: [NameListService],
    imports: [
        SequelizeModule.forFeature([NameList, TableAddingData, NameWork]),
        NameWorkModule,
    ],
    exports: [NameListService, SequelizeModule.forFeature([NameList])],
})
export class NameListModule {}
