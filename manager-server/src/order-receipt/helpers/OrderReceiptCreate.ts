import { IOrderReceiptCreateName } from 'src/interfaces/order-receipt-name/IOrderReceiptCreateName';
import { IOrderCreateWithNames } from 'src/interfaces/order-receipt/IOrderCreateWithNames';
import { CreateOrderReceiptNameDto } from 'src/order-receipt-name/dto/create-order-receipt-name.dto';
import { CreateOrderReceiptDto } from '../dto/create-order-receipt.dto';
import OrderReceipt from './OrderReceipt';

class OrderReceiptCreate extends OrderReceipt<CreateOrderReceiptDto> {
    private maxIndex: number;

    constructor(dto: CreateOrderReceiptDto) {
        super(dto);
        this.maxIndex = 0;
    }

    private getNames(): IOrderReceiptCreateName[] {
        return JSON.parse(this.getDto().orderReceiptNames);
    }

    private setMaxIndex() {
        const names = this.getNames();
        let max = 0;
        names.forEach((item) => {
            if (item.index > max) {
                max = item.index;
            }
        });
    }

    public setOrderIdAndProvider(dto: {
        providerId: number;
        orderReceiptId: number;
    }) {
        const arr: CreateOrderReceiptNameDto[] = JSON.parse(
            this.getDto().orderReceiptNames,
        );
        const finishArr = arr.map((item) => {
            return {
                id: item.id ?? 0,
                nameWorkId: item.nameWorkId ?? 0,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                index: item.index,
                orderReceiptId: dto.orderReceiptId,
                providerId:
                    item.providerId === 0 ? dto.providerId : item.providerId,
            };
        });

        return finishArr;
    }

    public getFinishDto(): IOrderCreateWithNames {
        return {
            id: this.getDto().id ?? 0,
            storageId: this.getDto().storageId ?? 0,
            userCreateId: this.getDto().userCreateId,
            names: this.getNames(),
            state: false,
        };
    }
}

export default OrderReceiptCreate;
