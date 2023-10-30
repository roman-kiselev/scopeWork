import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from 'src/user/user.service';
import { CreateUserDescriptionDto } from './dto/create-user-description.dto';
import { UserDescription } from './user-description.model';

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

  async edit(userId: string, firstname: string, lastname: string) {
    try {
      const userDescription = await this.userDescriptionRepository.findOne({
        where: { userId },
      });
      userDescription.firstname = firstname;
      userDescription.lastname = lastname;
      await userDescription.save();

      return userDescription;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
