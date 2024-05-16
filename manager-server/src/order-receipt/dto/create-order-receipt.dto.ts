import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export abstract class CreateOrderReceiptDto {
    @IsNumber()
    id: number;
    @IsNumber()
    @IsNotEmpty()
    storageId: number;
    @IsNumber()
    @IsNotEmpty()
    userCreateId: number;
    @IsString()
    orderReceiptNames: string;
}
