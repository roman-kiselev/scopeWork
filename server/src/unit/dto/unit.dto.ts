import {ApiProperty} from '@nestjs/swagger';

export class CreateUniteDto {
    @ApiProperty({example: 'шт.', description: 'Единица'})
    name: string;
    @ApiProperty({example: 'Штуки', description: 'Описание'})
    description: string;
}
