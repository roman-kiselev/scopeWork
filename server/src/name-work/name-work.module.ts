import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TotalVolume } from 'src/total-volume/total-volume.model';
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
    SequelizeModule.forFeature([NameWork, Unit, TotalVolume, TypeWork]),
    UnitModule,
    NameWorkTypeWork,
  ],
  exports: [NameWorkService],
})
export class NameWorkModule {}
