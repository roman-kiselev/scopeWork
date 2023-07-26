import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NameWork } from 'src/name-work/name-work.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { TotalVolumeController } from './total-volume.controller';
import { TotalVolume } from './total-volume.model';
import { TotalVolumeService } from './total-volume.service';

@Module({
  controllers: [TotalVolumeController],
  providers: [TotalVolumeService],
  imports: [SequelizeModule.forFeature([TotalVolume, NameWork, ScopeWork])],
  exports: [TotalVolumeService],
})
export class TotalVolumeModule {}
