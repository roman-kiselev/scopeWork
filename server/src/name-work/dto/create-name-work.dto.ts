import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNameWorkDto {
    @ApiProperty({ example: 'Товар', description: 'Наименование товара' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: '1', description: 'id Типа работ' })
    @IsNotEmpty()
    @IsArray()
    typeWorkId: number[];

    @ApiProperty({ example: '1', description: 'id еденицы измерения' })
    @Optional()
    @IsNumber()
    unitId?: number;
}
