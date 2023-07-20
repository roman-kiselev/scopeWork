import { Module } from '@nestjs/common';
import { TypeWorkController } from './type-work.controller';
import { TypeWorkService } from './type-work.service';

@Module({
  controllers: [TypeWorkController],
  providers: [TypeWorkService]
})
export class TypeWorkModule {}
