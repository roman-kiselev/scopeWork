import { Button, Col, Input, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { nameWorkApi } from "../../shared/api";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { INameWorkAndUnit } from "../../shared/interfaces";
import { pushData, setDataSelect } from "../../shared/models";

interface IDataSourse {
    key: number;
    id: number;
    name: string;
    unit: string;
}

const ShortListNamesWithoutTypes = () => {
    const dispatch = useAppDispatch();
    // Получение типов при изменении select
    const { selectedTypeWork } = useAppSelector((store) => store.nameWorkList);
    const { idNumber, typeWorkId } = useAppSelector(
        (store) => store.nameWorkList.oneItem
    );
    // const [valueOption, setValueOption] = useState(0);

    const { data: dataNameWork, isSuccess } =
        nameWorkApi.useGetAllNameWorkByTypeWorkIdQuery({
            typeWorkId:
                idNumber && typeWorkId !== null ? typeWorkId : selectedTypeWork,
        });

    const { list } = useAppSelector((store) => store.nameWorkList.oneItem);
    const { selectedData } = useAppSelector((store) => store.nameWork);

    const [stateSelectedData, setStateSelectedData] = useState<
        INameWorkAndUnit | []
    >([]);

    useEffect(() => {
        const stateSelectedData = selectedData;

        dispatch(pushData(stateSelectedData));
    }, [stateSelectedData, selectedData]);

    // Текст для поиска
    const [searchedText, setSearchedText] = useState("");
    // Выбранные строки checkbox
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
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
        dispatch(setDataSelect(selectedRowKeys));
        setSelectedRowKeys([]);
    };

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
