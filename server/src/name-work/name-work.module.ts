import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { TableAddingData } from 'src/table-adding-data/table-adding-data.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { Unit } from 'src/unit/unit.model';
import { UnitModule } from 'src/unit/unit.module';
import { NameWorkTypeWork } from './name-work-typework';
import { NameWorkController } from './name-work.controller';
import { NameWork } from './name-work.model';
import { NameWorkService } from './name-work.service';

@Module({
  controllers: [NameWorkController],
  providers: [NameWorkService],
  imports: [
    SequelizeModule.forFeature([
      NameWork,
      Unit,
      TypeWork,
      ListNameWork,
      TableAddingData,
      NameWorkTypeWork,
    ]),
    UnitModule,
    NameWorkTypeWork,
    DatabaseModule,
  ],
  exports: [NameWorkService],
})
export class NameWorkModule {}
