import { Button, Col, Input, Row, Select, Table } from "antd";
import { useState } from "react";
import { nameWorkApi, typeWorkApi } from "../../shared/api";

interface IDataSourse {
    key: number;
    id: number;
    name: string;
    unit: string;
}

const ShortListNames = () => {
    // Текст для поиска
    const [searchedText, setSearchedText] = useState("");
    // Выбранные строки checkbox
    const [loading] = useState(false);
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
    // Получаем данные о типах для первой загрузки
    const { data } = typeWorkApi.useGetAllShortQuery();
    const dataOption = data?.map((type) => {
        const { id, name } = type;
        return { value: id, label: name };
    });
    dataOption?.push({ value: 0, label: "Все типы" });
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
    const [valueOption, setValueOption] = useState(0);
    const { data: dataNameWork } =
        nameWorkApi.useGetAllNameWorkByTypeWorkIdQuery({
            typeWorkId: valueOption,
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

    const handleSelectChange = (value: number) => {
        setValueOption(value);
    };

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

export default ShortListNames;
