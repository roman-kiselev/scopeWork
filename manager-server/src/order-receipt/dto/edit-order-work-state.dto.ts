import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export abstract class EditOrderWorkStateDto {
    @IsNotEmpty()
    @IsBoolean()
    state: boolean;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    userRoles: string[];
}
