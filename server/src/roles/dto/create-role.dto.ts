import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'Наименование роли' })
  readonly name: string;
  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  readonly description: string;
}
