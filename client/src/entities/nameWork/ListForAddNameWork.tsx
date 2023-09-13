import { Button, Col, Form, Row, Select } from "antd";
import { useState } from "react";
import { nameWorkApi, typeWorkApi } from "../../shared/api";
import { useAppDispatch } from "../../shared/hooks";
import { getSelectedTypeWork, setSelectedTypeWork } from "../../shared/models";
import { EditTableForNewList } from "./table";

interface IDataSourse {
    key: number;
    id: number;
    name: string;
    unit: string;
}

// Интерфейс одной строки
interface Item {
    key: string;
    id: number;
    name: string;
    quantity: number;
}

// Начало основного компонента
const ListForAddNameWork = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    // Данные выбора типов
    // Получаем данные о типах для первой загрузки
    // Получение типов при изменении select
    const [valueOption, setValueOption] = useState(0);
    const { data: dataTypeWorks } = typeWorkApi.useGetAllShortQuery();
    const { data: dataNameWork, isSuccess } =
        nameWorkApi.useGetAllNameWorkByTypeWorkIdQuery({
            typeWorkId: valueOption,
        });

    const dataOption = dataTypeWorks?.map((type) => {
        const { id, name } = type;
        return { value: id, label: name };
    });
    dataOption?.push({ value: 0, label: "Выберите тип" });

    const handleSelectChange = (value: number) => {
        //console.log(dispatch(setSelectedTypeWork(value)));
        dispatch(setSelectedTypeWork(value));
        setValueOption(value);
    };

    return (
        <div style={{ overflow: "auto", height: "90vh" }}>
            <Row style={{ margin: "10px 0" }}>
                <Col style={{ marginRight: 10 }}>
                    <Button
                        type="primary"
                        onClick={() => dispatch(getSelectedTypeWork())}
                    >
                        Сохранить
                    </Button>
                </Col>
                <Col style={{ boxSizing: "border-box", marginRight: 10 }}>
                    <Select
                        defaultValue={0}
                        style={{ width: 180 }}
                        // loading
                        options={dataOption}
                        onChange={handleSelectChange}
                    />
                </Col>
            </Row>
            <EditTableForNewList form={form} />
        </div>
    );
};

export default ListForAddNameWork;
