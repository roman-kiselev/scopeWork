import { ApiProperty } from '@nestjs/swagger';
import { IRole } from '../roles/IRole';
import { UserDescription } from './UserDescription';

export abstract class User {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly banned: boolean;
  @ApiProperty()
  readonly createdAt: Date;
  @ApiProperty()
  readonly updatedAt: Date;
  @ApiProperty()
  readonly roles: IRole[];
  @ApiProperty()
  readonly userDescription: UserDescription;
}
