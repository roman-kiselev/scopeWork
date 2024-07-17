import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateObjectDto {
    @ApiProperty({ example: 'Зеландия', description: 'Наименование' })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ example: 'Пенза', description: 'Адрес' })
    @IsOptional()
    @IsString()
    readonly address: string;

    @ApiProperty({ example: 1, description: 'id организации' })
    @IsNotEmpty()
    @IsNumber()
    readonly organizationId: number;
}
