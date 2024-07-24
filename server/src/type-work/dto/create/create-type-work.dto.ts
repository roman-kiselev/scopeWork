import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeWorkDto {
    @ApiProperty({ example: 'АСКУЭ', description: 'Наименование' })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        example: 'Автоматизированная система',
        description: 'Описание',
    })
    @IsNotEmpty()
    @IsString()
    readonly description: string;
}
