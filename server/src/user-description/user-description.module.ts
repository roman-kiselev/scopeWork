import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/user/user.module';
import { UserDescriptionController } from './user-description.controller';
import { UserDescription } from './user-description.model';
import { UserDescriptionService } from './user-description.service';

@Module({
  controllers: [UserDescriptionController],
  providers: [UserDescriptionService],
  imports: [SequelizeModule.forFeature([UserDescription]), UserModule],
  exports: [UserDescriptionService],
})
export class UserDescriptionModule {}
