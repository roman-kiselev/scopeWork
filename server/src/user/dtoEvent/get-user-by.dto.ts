import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/interfaces/users/user';

type relationsUser = keyof User;

export class GetUserDto {
    @ApiProperty({
        example: {
            id: 1,
        },
        description: 'id пользователя',
    })
    @IsNotEmpty()
    criteria: Partial<User>;

    @Optional()
    @ApiProperty({ example: [], description: 'связи пользователя' })
    relations?: relationsUser[];
}
