import { Module } from '@nestjs/common';
import { UserDescriptionController } from './user-description.controller';
import { UserDescriptionService } from './user-description.service';

@Module({
  controllers: [UserDescriptionController],
  providers: [UserDescriptionService]
})
export class UserDescriptionModule {}
