import { Module } from '@nestjs/common';
import { LogListWorkController } from './log-list-work.controller';
import { LogListWorkService } from './log-list-work.service';

@Module({
  controllers: [LogListWorkController],
  providers: [LogListWorkService]
})
export class LogListWorkModule {}
