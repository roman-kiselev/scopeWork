import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { RoleName } from 'src/roles/enums/RoleName';

export class SignUpMainDto {
    @ApiProperty({
        example: 'email@email.com',
        description: 'User email',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '12345678',
        description: 'User password, min length is 8',
    })
    @MinLength(4)
    password: string;

    @ApiProperty({
        example: RoleName.USER,
        description: 'Тип пользователя',
        enum: RoleName,
    })
    @IsOptional()
    @IsString()
    role?: RoleName;
}
