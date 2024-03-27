import { ApiProperty } from '@nestjs/swagger';

export abstract class CreateStorageDto {
  @ApiProperty({ example: 'Основной', description: 'Наименование склада' })
  readonly name: string;
  @ApiProperty({ example: 'Основной', description: 'Наименование склада' })
  readonly address: string;
  @ApiProperty({ example: '1', description: 'ID Объекта' })
  readonly objectId?: string | null;
  @ApiProperty({ example: '2', description: 'ID Пользователя' })
  readonly userId?: string | null;
}
