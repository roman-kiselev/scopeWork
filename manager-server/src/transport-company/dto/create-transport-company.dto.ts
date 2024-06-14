import { ApiProperty } from '@nestjs/swagger';

export abstract class CreateTransportCompany {
  @ApiProperty({
    example: 'ТК Деловые Линии',
    description: 'Название транспортной компании',
  })
  name: string;
  @ApiProperty({ example: 'г. Пенза', description: 'Описание' })
  address: string;
}
