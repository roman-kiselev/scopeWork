import { ApiProperty } from '@nestjs/swagger';

export class CreateNameWorkDto {
  @ApiProperty({ example: 'Товар', description: 'Наименование товара' })
  name: string;
  @ApiProperty({ example: '1', description: 'id еденицы измерения' })
  unitId?: number;
}
