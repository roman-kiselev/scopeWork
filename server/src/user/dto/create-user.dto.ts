import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'email@email.ru', description: 'Почта пользователя' })
  readonly email: string;
  @ApiProperty({ example: 'admin', description: 'Пароль пользователя' })
  readonly password: string;
}
