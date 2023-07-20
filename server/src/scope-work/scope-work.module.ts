import { Module } from '@nestjs/common';
import { ScopeWorkController } from './scope-work.controller';
import { ScopeWorkService } from './scope-work.service';

@Module({
  controllers: [ScopeWorkController],
  providers: [ScopeWorkService]
})
export class ScopeWorkModule {}
