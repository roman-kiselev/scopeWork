import { Button, Input, Progress, Space, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { scopeWorkApi, tableAddingDataApi } from "../../shared/api";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { IListData, IValueForListData } from "../../shared/interfaces";

const OneScopeWorkForEdit = () => {
    const dispatch = useAppDispatch();
    const { id: idScopeWork } = useParams();
    // const { data } = scopeWorkApi.useGetListByScopeWorkIdQuery(
    //     {
    //         id: Number(idScopeWork),
    //     },
    //     {
    //         pollingInterval: 10000,
    //     }
    // );
    const { data } = useQuery(["getListByScopeWorkId", idScopeWork], () =>
        dispatch(
            scopeWorkApi.endpoints.getListByScopeWorkId.initiate({
                id: Number(idScopeWork),
            })
        )
    );

    const [setTableAddingData, { data: dataEdit }] =
        tableAddingDataApi.useAddDataMutation();
    const { listData } = useAppSelector((store) => store.dataOneUser);
    const { id: userId } = useAppSelector((store) => store.auth);
    const dataValue = listData?.map((item) => {
        return {
            idNameWork: item.nameWorkId,
            listNameWorkId: item.listNameWorkId,
            value: "",
        } as IValueForListData;
    });
    const [dataList, setDataList] = useState<IValueForListData[]>(dataValue);

    useEffect(() => {
        const dataValue = listData?.map((item) => {
            return {
                idNameWork: item.nameWorkId,
                value: "",
                listNameWorkId: item.listNameWorkId,
            } as IValueForListData;
        });
        setDataList(dataValue);
    }, [idScopeWork, data]);

    // Если нет доступа
    const { scopeWorkData, isLoading } = useAppSelector(
        (store) => store.dataOneUser
    );
    if (isLoading) {
        return <Spin />;
    }
    const findedScopeWork = scopeWorkData?.find(
        (item) => item.id === Number(idScopeWork)
    );
    if (!findedScopeWork) {
        return <>Нет доступа</>;
    }

    const getValue = (id: number, listNameWorkId: number) => {
        const findedValue = dataList.find(
            (item) =>
                item.idNameWork === id && item.listNameWorkId === listNameWorkId
        );

        return findedValue?.value ?? "";
    };

    const setValue = (
        idNameWork: number,
        listNameWorkId: number,
        e?: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e?.target.value ?? "";
        const updatedList = [...dataList];
        const index = updatedList.findIndex(
            (item) =>
                item.idNameWork === idNameWork &&
                item.listNameWorkId === listNameWorkId
        );

        if (index !== -1) {
            updatedList[index] = {
                ...updatedList[index],
                value,
            };
        }
        setDataList(updatedList);
    };

    const editData = (
        currentQuntity: number,
        nameWorkId: number,
        nameListId: number,
        scopeWorkId: number,
        userId: number | null,
        listNameWorkId: number
    ) => {
        if (userId !== null) {
            setTableAddingData({
                quntity: currentQuntity,
                nameWorkId,
                nameListId,
                scopeWorkId,
                userId,
            });
        }
        //dispatch(editOneQuntity({ id: nameWorkId, listId: listNameWorkId }));

        dispatch(
            scopeWorkApi.endpoints.getListByScopeWorkId.initiate({
                id: Number(idScopeWork),
            })
        );
        setValue(nameWorkId, listNameWorkId);
    };
    const dataForTable = listData.map((item, index) => {
        return {
            ...item,
            key: (index + 1).toString(),
            index: (index + 1).toString(),
        };
    });

    const columns: ColumnsType<IListData> = [
        {
            title: "",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Наименование",
            dataIndex: "name",
            key: "name",
            render: (_: any, { name, percent }) => (
                <>
                    <p>{name}</p>
                    {percent !== undefined && Number(percent) > 100 ? (
                        <Progress
                            percent={Number(percent)}
                            strokeColor="yellow"
                            status={"success"}
                        />
                    ) : (
                        <Progress
                            percent={Number(percent)}
                            status={
                                percent === undefined || Number(percent) < 100
                                    ? "active"
                                    : "success"
                            }
                        />
                    )}
                </>
            ),
        },
        {
            title: "Количество",
            dataIndex: "quntity",
            key: "quntity",
            render: (
                _: any,
                { nameListId, listNameWorkId, scopeWorkId, nameWorkId }
            ) => (
                <>
                    <Space>
                        <Input
                            style={{ minWidth: 50 }}
                            value={getValue(nameWorkId, listNameWorkId)}
                            onChange={(e) =>
                                setValue(nameWorkId, listNameWorkId, e)
                            }
                        />
                        <Button
                            type="primary"
                            onClick={() =>
                                editData(
                                    Number(
                                        getValue(nameWorkId, listNameWorkId)
                                    ),
                                    nameWorkId,
                                    nameListId,
                                    Number(scopeWorkId),
                                    userId,
                                    listNameWorkId
                                )
                            }
                            disabled={
                                getValue(nameWorkId, listNameWorkId) === ""
                                    ? true
                                    : false
                            }
                        >
                            Сохранить
                        </Button>
                    </Space>
                </>
            ),
        },
    ];

    return <Table size="small" dataSource={dataForTable} columns={columns} />;
};

export default OneScopeWorkForEdit;
