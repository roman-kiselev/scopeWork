import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ObjectTypeWork } from 'src/objects/objects-type_work.model';
import { TotalVolume } from 'src/total-volume/total-volume.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { ScopeWorkController } from './scope-work.controller';
import { ScopeWork } from './scope-work.model';
import { ScopeWorkService } from './scope-work.service';

@Module({
  controllers: [ScopeWorkController],
  providers: [ScopeWorkService],
  imports: [
    SequelizeModule.forFeature([
      ScopeWork,
      TypeWork,
      ObjectTypeWork,
      TotalVolume,
    ]),
  ],
  exports: [ScopeWorkService],
})
export class ScopeWorkModule {}
