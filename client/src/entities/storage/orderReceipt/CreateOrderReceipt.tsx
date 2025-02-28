import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { orderReceiptApi, storageApi } from "src/shared/api";
import { useAppDispatch, useAppSelector } from "src/shared/hooks";
import {
    ICreateOrderReceiptDto,
    IOrderReceipt,
    IOrderReceiptCreateName,
    IStorage,
} from "src/shared/interfaces";
import { resetOrderReceipt, setStorage } from "src/shared/models";
import { getItem } from "src/shared/utils";
import OrderReceipt from "./OrderReceipt";

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

const CreateOrderReceipt = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const { numberOrder } = useAppSelector(
    //     (store) => store.orders.orderReceipt
    // );
    useEffect(() => {
        dispatch(resetOrderReceipt());
    }, [dispatch]);

    // useEffect(() => {
    //     if (numberOrder !== 0) {
    //         navigate(`/storage/list-name-in-storage/${numberOrder}`, {
    //             replace: false,
    //         });
    //     }
    // }, []);

    const { id: userId } = useAppSelector((store) => store.auth);
    const { data: listStorage, isLoading: isLoadingStorage } =
        storageApi.useGetAllShortQuery();
    // const [createOrderReceipt, { isLoading: isLoadingCreateOrderReceipt }] =
    //     orderReceiptApi.useCreateOrderReceiptMutation();

    const { orderReceipt } = useAppSelector((store) => store.orders);

    if (isLoadingStorage) {
        return <Spin />;
    }

    const handleSave = async () => {
        if (userId) {
            const dto = prepareData(orderReceipt, userId);
            const createData = await dispatch(
                orderReceiptApi.endpoints.createOrderReceipt.initiate(dto)
            ).unwrap();

            if (createData) {
                navigate(`/storage/list-name-in-storage/${createData.id}`, {
                    replace: false,
                });
            }
        }
    };

    const handleChangeSelect = (value: number) => {
        if (listStorage) {
            const item = getItem<IStorage>(listStorage, value, "id");
            if (item) {
                dispatch(setStorage(item));
            }
        }
    };

    const dataForSelect =
        listStorage && listStorage !== undefined
            ? listStorage.map((item) => {
                  return {
                      value: item.id,
                      label: `${item.name} (${item.address})`,
                  };
              })
            : [];

    return (
        <OrderReceipt
            dataForSelect={dataForSelect}
            handleSave={handleSave}
            handleChangeSelect={handleChangeSelect}
        />
    );
};

export default CreateOrderReceipt;
