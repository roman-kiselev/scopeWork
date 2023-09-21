import { Button, Col, Form, Row, Select } from "antd";
import { useState } from "react";
import { listNameWorkApi, nameWorkApi, typeWorkApi } from "../../shared/api";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { IOneItemForListNameWork } from "../../shared/interfaces";
import { setSelectedTypeWork } from "../../shared/models";
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
    const { idNumber, typeWorkId, name, description, dateCreate, list } =
        useAppSelector((store) => store.nameWorkList.oneItem);
    const { selectedTypeWork } = useAppSelector((store) => store.nameWorkList);
    const [form] = Form.useForm();
    const dataForSave: IOneItemForListNameWork = {
        name,
        description,
        typeWorkId,
        list,
    };
    const [createList, { data }] = listNameWorkApi.useCreateListMutation();

    // Данные выбора типов
    // Получаем данные о типах для первой загрузки
    // Получение типов при изменении select
    const [valueOption, setValueOption] = useState(0);
    const { data: dataTypeWorks } = typeWorkApi.useGetAllShortQuery();
    const { data: dataNameWork, isSuccess } =
        nameWorkApi.useGetAllNameWorkByTypeWorkIdQuery({
            typeWorkId:
                idNumber && typeWorkId !== null ? typeWorkId : selectedTypeWork,
        });

    const dataOption = dataTypeWorks?.map((type) => {
        const { id, name } = type;
        return { value: id, label: name };
    });
    dataOption?.push({ value: 0, label: "Выберите тип" });

    const handleSelectChange = (value: number) => {
        dispatch(setSelectedTypeWork(value));
        setValueOption(value);
    };

    // Функция первого сохранения
    const handleFirstSave = async () => {
        const res = await createList(dataForSave);
    };
    // Функция сохранения при редактировании

    return (
        <div style={{ overflow: "auto", height: "90vh" }}>
            <Row style={{ margin: "10px 0" }}>
                <Col style={{ marginRight: 10 }}>
                    {idNumber ? (
                        <Button type="primary" onClick={() => {}}>
                            Сохранить изменения
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            // Отключаем кнопку если тип не выбран
                            disabled={valueOption === 0 ? true : false}
                            onClick={handleFirstSave}
                        >
                            Сохранить
                        </Button>
                    )}
                </Col>
                <Col style={{ boxSizing: "border-box", marginRight: 10 }}>
                    <Select
                        defaultValue={idNumber ? typeWorkId : 0}
                        style={{ width: 180 }}
                        // loading
                        // Отключаем выбор если уже выбран тип
                        disabled={idNumber || list.length >= 1 ? true : false}
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
