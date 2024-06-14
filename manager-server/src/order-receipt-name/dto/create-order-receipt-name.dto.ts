import { Status } from '@prisma/client';

export abstract class CreateOrderReceiptNameDto {
    id: number;
    index: number;
    nameWorkId: number;
    name: string;
    quantity: number;
    price: number;
    orderReceiptId: number;
    providerId: number;
    status?: Status;
    rowId?: number;
}
