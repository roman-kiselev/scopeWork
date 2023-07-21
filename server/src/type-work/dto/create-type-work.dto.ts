import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeWorkDto {
  @ApiProperty({ example: 'АСКУЭ', description: 'Наименование' })
  readonly name: string;
  @ApiProperty({
    example: 'Автоматизированная система',
    description: 'Описание',
  })
  readonly description?: string;
}
