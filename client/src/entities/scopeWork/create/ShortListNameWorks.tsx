import { Button, Col, Input, Row, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { listNameWorkApi, unitsApi } from "../../../shared/api";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { addList } from "./../../../shared/models";
import DrawerOneList from "./DrawerOneList";

interface ShortListNameWorksProps {
    typeWorkId: number;
}

interface IDataForColumn {
    key: number;
    id: number;
    number: number;
    name: string;
    description: string;
    action: number;
}

const ShortListNameWorks = () => {
    const dispatch = useAppDispatch();
    const query = unitsApi.useGetAllUnitsQuery();
    const { selectedTypeWorkId, isLoading } = useAppSelector(
        (store) => store.scopeWork
    );
    const { data } = listNameWorkApi.useGetOneByTypeWorkIdQuery({
        id: Number(selectedTypeWorkId),
    });

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    useEffect(() => {
        setSelectedRowKeys([]);
    }, [selectedTypeWorkId]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    // Текст для поиска
    const [searchedText, setSearchedText] = useState("");
    // Поиск по номеру
    if (isLoading) {
        return <Spin />;
    }
    const columns: ColumnsType<IDataForColumn> = [
        {
            title: "№",
            dataIndex: "number",
            key: "number",
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
        },
        {
            title: "Действие",
            dataIndex: "action",
            key: "action",
            render: (num) => <DrawerOneList key={num} id={num} />,
        },
    ];

    const listNameWorks: IDataForColumn[] | undefined = data?.map((list) => {
        const { name, id, description } = list;
        return {
            id: id,
            key: id,
            number: id,
            name: name ?? "",
            description: description ?? "",
            action: id,
        };
    });

    const addNewList = () => {
        dispatch(addList({ arrListId: selectedRowKeys }));
    };

    return (
        <Row>
            <Col style={{ flexDirection: "column" }}>
                <div style={{ marginBottom: 16, marginTop: 10 }}>
                    <Button
                        type="primary"
                        onClick={addNewList}
                        disabled={!hasSelected}
                        //loading={loading}
                    >
                        Добавить
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected
                            ? `Выбрано ${selectedRowKeys.length} шт`
                            : ""}
                    </span>
                </div>

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
            </Col>
            <Col style={{ marginTop: 10, width: "100%" }}>
                <Table
                    dataSource={listNameWorks}
                    columns={columns}
                    rowSelection={rowSelection}
                    style={{ width: "100%" }}
                />
            </Col>
        </Row>
    );
};

export default ShortListNameWorks;
