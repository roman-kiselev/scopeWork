import { Col, Input, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { scopeWorkApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";
import { IListData, IValueForListData } from "../../shared/interfaces";
import ColumnName from "./oneScopeWork/ColumnName";
import ColumnQuntity from "./oneScopeWork/ColumnQuntity";

const OneScopeWorkForEdit = () => {
    const { id, banned } = useAppSelector((store) => store.auth);
    // const { data: scopeWorkDataQuick } =
    //     scopeWorkApi.useQuickOneScopeWorkByIdQuery({
    //         id: id !== null && !banned ? id.toString() : "0",
    //     });
    // console.log(scopeWorkDataQuick);

    const [searchedText, setSearchedText] = useState("");

    const { id: idScopeWork } = useParams();
    const {
        data,
        refetch,
        isLoading: isLoadingQuery,
    } = scopeWorkApi.useGetListByScopeWorkIdQuery({
        id: Number(idScopeWork),
    });

    const { listData } = useAppSelector((store) => store.dataOneUser);

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

    const findedScopeWork = scopeWorkData?.find(
        (item) => item.id === Number(idScopeWork)
    );

    if (id) {
        const { data, isLoading: isLoadingTest } =
            scopeWorkApi.useGetAllScopeWorkByUserIdQuery({
                id: id,
            });
        if (isLoadingTest) {
            return <Spin />;
        }
    }
    if (isLoadingQuery) {
        return <Spin />;
    }

    if (!findedScopeWork || banned) {
        return <>Нет доступа</>;
    }

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
            render: (
                _: any,
                {
                    name,
                    percent,
                    quntity,
                    count,
                    unitId,
                    nameListId,
                    nameWorkId,
                    scopeWorkId,
                }
            ) => (
                <ColumnName
                    count={count}
                    name={name}
                    percent={percent}
                    quntity={quntity}
                    unitId={unitId}
                    isLoading={isLoading}
                    nameListId={nameListId}
                    nameWorkId={nameWorkId}
                    scopeWorkId={scopeWorkId}
                    refetch={refetch}
                />
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
                <ColumnQuntity
                    dataList={dataList}
                    listNameWorkId={listNameWorkId}
                    nameListId={nameListId}
                    nameWorkId={nameWorkId}
                    scopeWorkId={scopeWorkId}
                    setDataList={setDataList}
                    refetch={refetch}
                />
            ),
        },
    ];

    return (
        <Col>
            <Col style={{ maxWidth: "300px" }}>
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
            </Col>

            <Table size="small" dataSource={dataForTable} columns={columns} />
        </Col>
    );
};

export default OneScopeWorkForEdit;
