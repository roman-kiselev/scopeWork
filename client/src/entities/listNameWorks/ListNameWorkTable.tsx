import { Button, Space, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { listNameWorkApi } from "../../shared/api";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";

interface DataType {
    key: string;
    id: number;
    index: number;
    number: string;
    date: string;
    description: string;
}

// Получаем дату
const getDate = (d: string) => {
    const arrD = d.split("T");
    return arrD[0];
};

const ListNameWorkTable = () => {
    const dispatch = useAppDispatch();
    const { isLoading: isLoadingQuery } = listNameWorkApi.useGetAllNamesQuery();
    if (isLoadingQuery) <Spin />;
    // const [copyListNameWork, { data: dataCopy }] =
    //     listNameWorkApi.useCopyListMutation();
    const { isLoading, listItem } = useAppSelector(
        (store) => store.nameWorkList
    );

    const columns: ColumnsType<DataType> = [
        {
            title: "№",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "№ Списка",
            dataIndex: "number",
            key: "number",
        },
        {
            title: "Дата создания",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Наименование и Описание",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Действия",
            dataIndex: "action",
            key: "action",
            render: (_: any, { id }) => (
                <Space>
                    <Link to={`${id}`}>Перейти</Link>
                    <Button
                        size="small"
                        type="primary"
                        onClick={() =>
                            dispatch(
                                listNameWorkApi.endpoints.copyList.initiate({
                                    id,
                                })
                            )
                        }
                    >
                        Копировать
                    </Button>
                </Space>
            ),
        },
    ];

    const dataForTable = listItem?.map((item, index) => {
        const { id, createdAt, description, name } = item;
        return {
            id: id,
            date: getDate(createdAt),
            index: index + 1,
            key: id?.toString(),
            description: `${name} ${description}`,
            number: id?.toString(),
        };
    });

    if (isLoading) {
        return <h3>Loading...</h3>;
    }
    return <Table dataSource={dataForTable} columns={columns} />;
};

export default ListNameWorkTable;
