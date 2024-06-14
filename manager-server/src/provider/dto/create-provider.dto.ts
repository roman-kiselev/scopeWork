import { ApiProperty } from '@nestjs/swagger';

export abstract class CreateProviderDto {
  @ApiProperty({ example: 'ООО "РиК"', description: 'Название поставщика' })
  readonly name: string;
  @ApiProperty({ example: 'г. Пенза', description: 'Адрес' })
  readonly address: string;
}
