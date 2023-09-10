import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NameWork } from 'src/name-work/name-work.model';
import { NameList } from 'src/name_list/name-list.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { ListNameWorkController } from './list-name-work.controller';
import { ListNameWork } from './list-name-work.model';
import { ListNameWorkService } from './list-name-work.service';

@Module({
  controllers: [ListNameWorkController],
  providers: [ListNameWorkService],
  imports: [
    SequelizeModule.forFeature([ListNameWork, TypeWork, NameWork, NameList]),
  ],
  exports: [],
})
export class ListNameWorkModule {}
