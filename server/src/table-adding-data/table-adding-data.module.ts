import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NameList } from 'src/name_list/name-list.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { User } from 'src/user/user.model';
import { TableAddingDataController } from './table-adding-data.controller';
import { TableAddingData } from './table-adding-data.model';
import { TableAddingDataService } from './table-adding-data.service';

@Module({
  controllers: [TableAddingDataController],
  providers: [TableAddingDataService],
  imports: [
    SequelizeModule.forFeature([TableAddingData, User, NameList, ScopeWork]),
  ],
})
export class TableAddingDataModule {}
