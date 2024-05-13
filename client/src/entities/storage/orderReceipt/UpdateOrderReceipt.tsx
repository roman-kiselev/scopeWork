import { Spin } from "antd";
import { orderReceiptApi, storageApi } from "src/shared/api";
import { useAppDispatch } from "src/shared/hooks";
import { IStorage } from "src/shared/interfaces";
import { setStorage } from "src/shared/models";
import { getItem } from "src/shared/utils";
import OrderReceipt from "./OrderReceipt";

interface IUpdateOrderReceiptProps {
    id: string;
}

const UpdateOrderReceipt: React.FC<IUpdateOrderReceiptProps> = ({ id }) => {
    const dispatch = useAppDispatch();

    const { data: order, isLoading: isLoadingOrder } =
        orderReceiptApi.useGetOneOrderReceiptQuery(id);

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

    return (
        <>
            <OrderReceipt
                dataForSelect={dataForSelect}
                handleSave={() => {}}
                handleChangeSelect={handleChangeSelect}
                defaultValue={order?.storage?.id ?? 0}
            />
        </>
    );
};

export default UpdateOrderReceipt;
