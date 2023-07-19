import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDescriptionDto {
  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  readonly firstname: string;
  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  readonly lastname: string;
  @ApiProperty({ example: '1', description: 'ID пользователя' })
  readonly userId?: number;
}
