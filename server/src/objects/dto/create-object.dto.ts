import { ApiProperty } from '@nestjs/swagger';

export class CreateObjectDto {
  @ApiProperty({ example: 'Зеландия', description: 'Наименование' })
  readonly name: string;
  @ApiProperty({ example: 'Пенза', description: 'Адрес' })
  readonly address: string;
}
