import { ApiProperty } from '@nestjs/swagger';

export class CreateNameListDto {
  @ApiProperty({ example: 4, description: 'Количество' })
  readonly quntity: number;
  @ApiProperty({ example: 4, description: 'Количество' })
  readonly nameWorkId: number;
  @ApiProperty({ example: 4, description: 'Количество' })
  readonly listNameWorkId: number;
}
