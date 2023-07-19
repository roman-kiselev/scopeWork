import { CreateUserDescriptionDto } from 'src/user-description/dto/create-user-description.dto';
import { CreateUserDto } from './create-user.dto';

export interface CreateUserAndDescription
  extends CreateUserDto,
    CreateUserDescriptionDto {}
