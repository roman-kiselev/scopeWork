import { Module } from '@nestjs/common';
import { ListWorkController } from './list-work.controller';
import { ListWorkService } from './list-work.service';

@Module({
  controllers: [ListWorkController],
  providers: [ListWorkService]
})
export class ListWorkModule {}
