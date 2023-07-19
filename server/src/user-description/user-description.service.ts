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

  async create(dto: CreateUserDescriptionDto) {
    try {
      const isUser = await this.userDescriptionRepository.findOne({
        where: {
          userId: dto.userId,
        },
      });
      if (isUser) {
        throw new HttpException('Данные существуют', HttpStatus.BAD_REQUEST);
      }
      const user = await this.userService.findUserById(dto.userId);

      const userDescription = await this.userDescriptionRepository.create(dto);
      if (user && userDescription) {
        userDescription.userId = user.id;
        return userDescription;
      }
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
