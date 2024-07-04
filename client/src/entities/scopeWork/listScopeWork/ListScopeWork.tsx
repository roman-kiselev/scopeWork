import { Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import {
    objectsApi,
    scopeWorkApi,
    typeWorkApi,
    userApi,
} from "../../../shared/api";

interface DataType {
    key: string;
    id: number;
    index: number;
    number: string;
    date: string;
    typeWork: string;
    object: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "№",
        dataIndex: "index",
        key: "index",
    },
    {
        title: "№ Объёма",
        dataIndex: "number",
        key: "number",
    },
    {
        title: "Дата создания",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Тип работ",
        dataIndex: "typeWork",
        key: "typeWork",
    },
    {
        title: "Объект",
        dataIndex: "object",
        key: "object",
    },
    {
        title: "Действия",
        dataIndex: "action",
        key: "action",
        render: (_: any, { id }) => <Link to={`${id}`}>Перейти</Link>,
    },
];

const ListScopeWork = () => {
    const { data: dataScopeWork, isLoading: isLoadingScopeWorkAll } =
        scopeWorkApi.useGetAllScopeWorkQuery();
    const { isLoading: isLoadingUser } = userApi.useGetAllUsersQuery();
    const { data: dataObject, isLoading: isLoadingObject } =
        objectsApi.useGetAllObjectsQuery();
    const { data: dataTypeWork, isLoading: isLoadingScopeWork } =
        typeWorkApi.useGetAllTypeWorkQuery();
    if (
        isLoadingScopeWorkAll ||
        isLoadingUser ||
        isLoadingObject ||
        isLoadingScopeWork
    ) {
        return <Spin />;
    }

    const dataForTable = dataScopeWork?.map((scopeWork, index) => {
        const { id, createdAt, objectId, typeWorkId } = scopeWork;
        const findedObject = dataObject?.find((item) => item.id === objectId);
        const findedTytpeWork = dataTypeWork?.find(
            (item) => item.id === typeWorkId
        );
        return {
            id,
            index: index + 1,
            date: createdAt.toString().split("T")[0],
            key: id.toString(),
            number: id.toString(),
            object: findedObject?.name ?? "",
            typeWork: findedTytpeWork?.name ?? "",
        } as DataType;
    });
    return <Table dataSource={dataForTable} columns={columns} />;
};

export default ListScopeWork;
