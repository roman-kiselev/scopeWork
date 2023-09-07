import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
  @ApiProperty({ example: 'Лист 1', description: 'Наименование' })
  readonly name?: string;
  @ApiProperty({
    example: 'Для такого то объета',
    description: 'Описание списка',
  })
  readonly description?: string;
  @ApiProperty({
    example: '1',
    description: 'id Типа Работ',
  })
  readonly typeWorkId?: number;
}
