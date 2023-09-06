import { Button, Input, MenuProps, Row, Select, Table } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { nameWorkApi, typeWorkApi } from "../../shared/api";

const dataSource = [
    {
        key: "1",
        name: "Кран шаровый ду.50",
        unit: "шт.",
        // address: "10 Downing Street",
    },
    {
        key: "2",
        name: "John",
        unit: "м",
        // address: "10 Downing Street",
    },
];

const items: MenuProps["items"] = [
    {
        label: "АСКУЭ",
        key: "1",
    },
    {
        label: "Водоснабжение",
        key: "2",
    },
];

const ShortListNames = () => {
    const [searchedText, setSearchedText] = useState("");
    // const { data: dataNameWork, isSuccess } =
    //     nameWorkApi.useGetAllNameWorkByTypeWorkIdQuery({
    //         typeWorkId: 0,
    //     });
    const { data: dataNameWork, isSuccess } = useQuery(
        "getAllNameWorkByTypeWorkId",
        () => nameWorkApi.useGetAllNameWorkByTypeWorkIdQuery({ typeWorkId: 0 })
    );
    console.log(dataNameWork);
    // Получаем данные о типах
    const { data } = typeWorkApi.useGetAllShortQuery();
    const dataOption = data?.map((type) => {
        const { id, name } = type;
        return { value: id, label: name };
    });
    dataOption?.push({ value: 0, label: "Все типы" });
    // Получаем наименования по id Типа
    // Создаём колонки
    const columns = [
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
            title: "Ед.изм.",
            dataIndex: "unit",
            key: "unit",
        },
    ];

    //
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);

    const start = () => {
        console.log(selectedRowKeys);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const [names, setNames] = useState([]);
    const handleSelectChange = (value: number) => {
        const { data, isSuccess } =
            nameWorkApi.useGetAllNameWorkByTypeWorkIdQuery({
                typeWorkId: value,
            });
        console.log(data);
    };

    return (
        <Row style={{ maxHeight: "70vh", flexDirection: "column" }}>
            <div style={{ marginBottom: 16, marginTop: 10 }}>
                <Button
                    type="primary"
                    onClick={start}
                    disabled={!hasSelected}
                    loading={loading}
                >
                    Добавить
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Выбрано ${selectedRowKeys.length} шт` : ""}
                </span>
            </div>
            <Row style={{ boxSizing: "border-box" }}>
                <Select
                    defaultValue={0}
                    style={{ width: 180 }}
                    // loading
                    options={dataOption}
                    onChange={handleSelectChange}
                />
            </Row>
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
            <Row style={{ marginTop: 10 }}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    rowSelection={rowSelection}
                    style={{ width: "100%" }}
                />
            </Row>
        </Row>
    );
};

export default ShortListNames;
