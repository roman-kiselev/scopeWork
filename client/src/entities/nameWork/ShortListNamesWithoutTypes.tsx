import { Button, Col, Input, MenuProps, Row, Table } from "antd";
import { useState } from "react";
import { nameWorkApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

interface IDataSourse {
    key: number;
    id: number;
    name: string;
    unit: string;
}
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

const ShortListNamesWithoutTypes = () => {
    // Текст для поиска
    const [searchedText, setSearchedText] = useState("");
    // Выбранные строки checkbox
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

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
    // Добавление выбранных строк
    const start = () => {
        console.log(selectedRowKeys);
    };
    // Получение типов при изменении select
    const { selectedTypeWork } = useAppSelector((store) => store.nameWorkList);
    const [valueOption, setValueOption] = useState(0);
    const { data: dataNameWork, isSuccess } =
        nameWorkApi.useGetAllNameWorkByTypeWorkIdQuery({
            typeWorkId: selectedTypeWork,
        });

    const newDataNameWork: IDataSourse[] | undefined = dataNameWork?.map(
        (name) => {
            const { id, name: nameWork, unit } = name;

            return {
                id: id,
                key: id,
                name: nameWork,
                unit: unit ? unit.name : "шт",
            } as IDataSourse;
        }
    );

    return (
        <Row style={{ maxHeight: "70vh" }}>
            <Col style={{ flexDirection: "column" }}>
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
                    dataSource={newDataNameWork}
                    columns={columns}
                    rowSelection={rowSelection}
                    style={{ width: "100%" }}
                />
            </Col>
        </Row>
    );
};

export default ShortListNamesWithoutTypes;
