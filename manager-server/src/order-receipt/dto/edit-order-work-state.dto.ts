import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export abstract class EditOrderWorkStateDto {
    @IsNotEmpty()
    @IsNumber()
    orderReceiptId: number;

    @IsNotEmpty()
    @IsBoolean()
    state: boolean;
}
