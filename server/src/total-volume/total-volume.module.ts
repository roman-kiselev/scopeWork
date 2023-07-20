import { Module } from '@nestjs/common';
import { TotalVolumeController } from './total-volume.controller';
import { TotalVolumeService } from './total-volume.service';

@Module({
  controllers: [TotalVolumeController],
  providers: [TotalVolumeService]
})
export class TotalVolumeModule {}
