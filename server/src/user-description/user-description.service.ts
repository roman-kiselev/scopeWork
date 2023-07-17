import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDescription } from './user-description.model';
import { CreateUserDescriptionDto } from './dto/create-user-description.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserDescriptionService {
  constructor(
    @InjectModel(UserDescription)
    private userDescriptionRepository: typeof UserDescription,
    private userService: UserService,
  ) {}

  async create(dto: CreateUserDescriptionDto, userId: number) {
    try {
      const user = await this.userService.findUserById(userId);
      const userDescription = await this.userDescriptionRepository.create(dto);
      if (user && userDescription) {
        userDescription.$set('userId', user);
        return userDescription;
      }
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
