import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { UserDescriptionController } from './user-description.controller';
import { UserDescription } from './user-description.model';
import { UserDescriptionService } from './user-description.service';

@Module({
  controllers: [UserDescriptionController],
  providers: [UserDescriptionService],
  imports: [
    SequelizeModule.forFeature([UserDescription, User]),
    forwardRef(() => UserModule),
  ],
  exports: [UserDescriptionService],
})
export class UserDescriptionModule {}
