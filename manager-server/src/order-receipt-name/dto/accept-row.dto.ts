import { IsNotEmpty, IsNumber } from 'class-validator';

export class AcceptRowDto {
    @IsNotEmpty()
    @IsNumber()
    orderId: number;
}
