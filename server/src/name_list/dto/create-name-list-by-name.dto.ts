import { ApiProperty } from '@nestjs/swagger';

export interface Item {
  index: number;
  key: string;
  id: number;
  name: string;
  quntity: number;
}

export class CreateNameListByNameDto {
  @ApiProperty({ example: 4, description: 'Количество' })
  readonly typeWorkId: number;
  readonly listNameWorkId: number;
  readonly list: Item[];
}
