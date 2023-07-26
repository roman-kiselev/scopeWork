import { ApiProperty } from '@nestjs/swagger';

export class CreateTotalVolumeDto {
  // @ApiProperty({ example: '1', description: 'Номер документа' })
  // readonly number: string;
  @ApiProperty({ example: '20', description: 'Количество' })
  readonly quantity: number;
  @ApiProperty({ example: '1', description: 'Наименование товара' })
  readonly nameWorkId: number;
  @ApiProperty({ example: '2', description: 'Номер главного документа' })
  readonly scopeWorkId: number;
}
