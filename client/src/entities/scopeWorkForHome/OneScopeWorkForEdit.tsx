import {
    Button,
    Col,
    Input,
    Progress,
    Row,
    Space,
    Spin,
    Table,
    Tag,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { RoleString } from "src/shared/config";
import { scopeWorkApi, tableAddingDataApi } from "../../shared/api";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { IListData, IRole, IValueForListData } from "../../shared/interfaces";

const checkRole = (data: IRole[], name: RoleString): boolean => {
    const findedRole = data.find((item) => item.name === name);
    if (findedRole) {
        return true;
    }
    return false;
};

const OneScopeWorkForEdit = () => {
    const dispatch = useAppDispatch();
    const [searchedText, setSearchedText] = useState("");
    const { id: idScopeWork } = useParams();
    const { roles } = useAppSelector((store) => store.auth);
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
            filteredValue: [searchedText],
            onFilter: (value: any, record: any) => {
                return String(record.name)
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
            render: (_: any, { name, percent, quntity, count }) => (
                <>
                    <p>{name}</p>
                    {checkRole(roles, RoleString.MASTER) ||
                    checkRole(roles, RoleString.ADMIN) ? (
                        <Tag color="red">Ост. {quntity - count} ед.</Tag>
                    ) : null}
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
                        <Row>
                            <Col>
                                <Input
                                    value={getValue(nameWorkId, listNameWorkId)}
                                    onChange={(e) =>
                                        setValue(nameWorkId, listNameWorkId, e)
                                    }
                                />
                            </Col>
                            <Col>
                                <Button
                                    type="primary"
                                    onClick={() =>
                                        editData(
                                            Number(
                                                getValue(
                                                    nameWorkId,
                                                    listNameWorkId
                                                )
                                            ),
                                            nameWorkId,
                                            nameListId,
                                            Number(scopeWorkId),
                                            userId,
                                            listNameWorkId
                                        )
                                    }
                                    disabled={
                                        getValue(nameWorkId, listNameWorkId) ===
                                        ""
                                            ? true
                                            : false
                                    }
                                >
                                    Сохранить
                                </Button>
                            </Col>
                        </Row>
                    </Space>
                </>
            ),
        },
    ];

    return (
        <Row>
            <Row>
                <Input.Search
                    placeholder="Поиск ..."
                    style={{ margin: "10px 0" }}
                    onSearch={(value) => {
                        setSearchedText(value);
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchedText(e.target.value);
                    }}
                />
            </Row>
            <Row>
                <Table
                    size="small"
                    dataSource={dataForTable}
                    columns={columns}
                />
            </Row>
        </Row>
    );
};

export default OneScopeWorkForEdit;
