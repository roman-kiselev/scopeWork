import { ApiProperty } from '@nestjs/swagger';
import { CreateStorageDto } from './create-storage.dto';

export abstract class EditStorageDto extends CreateStorageDto {
  @ApiProperty({ example: '1', description: 'ID Склада' })
  readonly id: string;
}
