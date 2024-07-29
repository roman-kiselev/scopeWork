import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class TestDto {
    @ApiProperty({
        example: 'stroi.energoservis@yandex.ru',
        description: 'Почтовый адрес',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
