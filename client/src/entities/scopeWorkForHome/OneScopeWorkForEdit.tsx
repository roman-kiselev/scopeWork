import { Button, Input, Progress, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { useParams } from "react-router";
import { scopeWorkApi, tableAddingDataApi } from "../../shared/api";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { IListByScopeWorkIdTest } from "../../shared/interfaces";
import { editOneQuntity } from "../../shared/models";

const OneScopeWorkForEdit = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { data } = scopeWorkApi.useGetListByScopeWorkIdQuery({
        id: Number(id),
    });
    const [setTableAddingData, { data: dataEdit }] =
        tableAddingDataApi.useAddDataMutation();
    const { listByScopeWorkId, listByScopeWorkIdTest } = useAppSelector(
        (store) => store.dataOneUser
    );
    const { id: userId } = useAppSelector((store) => store.auth);

    const [dataList, setDataList] = useState<IListByScopeWorkIdTest[] | []>([]);
    // useEffect(() => {
    //     setDataList(listByScopeWorkIdTest);
    // }, [listByScopeWorkId, listByScopeWorkIdTest, , dispatch, dataEdit]);

    const addQuantity = (
        id: number,
        listId: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        dispatch(editOneQuntity({ id, listId, value }));
        dispatch(
            scopeWorkApi.endpoints.getListByScopeWorkId.initiate({
                id: Number(id),
            })
        );
    };
    const editData = (
        currentQuntity: number,
        nameWorkId: number,
        nameListId: number,
        scopeWorkId: number,
        userId: number | null
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
        dispatch(editOneQuntity({ id: nameWorkId, listId: nameListId }));

        dispatch(
            scopeWorkApi.endpoints.getListByScopeWorkId.initiate({
                id: Number(id),
            })
        );
    };

    const columns: ColumnsType<IListByScopeWorkIdTest> = [
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
                    {percent !== undefined && percent > 100 ? (
                        <Progress
                            percent={percent}
                            strokeColor="yellow"
                            status={"success"}
                        />
                    ) : (
                        <Progress
                            percent={percent}
                            status={
                                percent === undefined || percent < 100
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
                { currentQuntity, id, listNameWorkId, scopeWorkId }
            ) => (
                <>
                    <Space>
                        <Input
                            style={{ minWidth: 50 }}
                            value={currentQuntity}
                            onChange={(e) => addQuantity(id, listNameWorkId, e)}
                        />
                        <Button
                            type="primary"
                            onClick={() =>
                                editData(
                                    Number(currentQuntity),
                                    id,
                                    listNameWorkId,
                                    scopeWorkId,
                                    userId
                                )
                            }
                            disabled={currentQuntity === "" ? true : false}
                        >
                            Сохранить
                        </Button>
                    </Space>
                </>
            ),
        },
    ];

    return (
        <Table
            size="small"
            dataSource={listByScopeWorkIdTest}
            columns={columns}
        />
    );
};

export default OneScopeWorkForEdit;
