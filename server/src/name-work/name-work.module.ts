import { Module } from '@nestjs/common';
import { NameWorkController } from './name-work.controller';
import { NameWorkService } from './name-work.service';

@Module({
  controllers: [NameWorkController],
  providers: [NameWorkService]
})
export class NameWorkModule {}
