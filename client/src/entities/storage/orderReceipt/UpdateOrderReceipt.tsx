import { Spin } from "antd";
import { orderReceiptApi, storageApi } from "src/shared/api";
import { useAppDispatch, useAppSelector } from "src/shared/hooks";
import {
    ICreateOrderReceiptDto,
    IOrderReceipt,
    IOrderReceiptCreateName,
    IStorage,
} from "src/shared/interfaces";
import { setStorage } from "src/shared/models";
import { getItem } from "src/shared/utils";
import OrderReceipt from "./OrderReceipt";

interface IUpdateOrderReceiptProps {
    id: string;
}

const prepareData = (
    data: IOrderReceipt,
    userId: number
): ICreateOrderReceiptDto => {
    const names: IOrderReceiptCreateName[] = [];

    data.data.forEach((item) => {
        if (item.name) {
            names.push({
                id: item.id,
                index: item.index,
                nameWorkId: item.name.id ? item.name.id : 0,
                name: item.name ? item.name.name : "",
                quantity: Number(item.quantity),
                price: Number(item.price),
                orderReceiptId: item.id,
                providerId: item.provider ? item.provider.id : 0,
            } as IOrderReceiptCreateName);
        }
    });

    const finishData: ICreateOrderReceiptDto = {
        id: data.numberOrder,
        storageId: data.storage?.id ?? 0,
        userCreateId: userId,
        orderReceiptNames: JSON.stringify(names),
    };

    return finishData;
};

const UpdateOrderReceipt: React.FC<IUpdateOrderReceiptProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const { id: userId } = useAppSelector((store) => store.auth);
    const { orderReceipt } = useAppSelector((store) => store.orders);
    const { data: order, isLoading: isLoadingOrder } =
        orderReceiptApi.useGetOneOrderReceiptQuery(id);

    const [updateOrder, { data: dataUpdate }] =
        orderReceiptApi.useUpdateOrderReceiptMutation();
    const { data: listStorage, isLoading: isLoadingStorage } =
        storageApi.useGetAllShortQuery();

    const dataForSelect =
        listStorage && listStorage !== undefined
            ? listStorage.map((item) => {
                  return {
                      value: item.id,
                      label: `${item.name} (${item.address})`,
                  };
              })
            : [];

    if (isLoadingOrder || isLoadingStorage) {
        return <Spin />;
    }

    const handleChangeSelect = (value: number) => {
        if (listStorage) {
            const item = getItem<IStorage>(listStorage, value, "id");
            if (item) {
                dispatch(setStorage(item));
            }
        }
    };

    const handleSave = () => {
        if (userId) {
            const dto = prepareData(orderReceipt, userId);
            updateOrder({
                id: +id,
                dto: dto,
            });
        }
    };

    return (
        <>
            <OrderReceipt
                dataForSelect={dataForSelect}
                handleSave={handleSave}
                handleChangeSelect={handleChangeSelect}
                defaultValue={order?.storage?.id ?? 0}
            />
        </>
    );
};

export default UpdateOrderReceipt;
