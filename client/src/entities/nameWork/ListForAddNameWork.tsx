import { Button, Col, Form, Row, Select, message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listNameWorkApi, nameWorkApi, typeWorkApi } from "../../shared/api";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import {
    INameListWork,
    IOneItemForListNameWork,
} from "../../shared/interfaces";
import { resetForOneItem, setSelectedTypeWork } from "../../shared/models";
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
    quntity: number;
}

// Начало основного компонента
const ListForAddNameWork = () => {
    const dispatch = useAppDispatch();

    // Уведомление о сохранении
    const [messageApi, contextHolder] = message.useMessage();
    const key = "updatable";
    const keyTwo = "save";
    const openMessageEdit = (err: boolean) => {
        messageApi.open({
            key,
            type: "loading",
            content: "Подождите...",
        });
        if (!err) {
            setTimeout(() => {
                messageApi.open({
                    key,
                    type: "success",
                    content: "Сохранено",
                    duration: 2,
                });
            }, 2000);
        } else {
            setTimeout(() => {
                messageApi.open({
                    key,
                    type: "error",
                    content: "Не удалось сохранить",
                    duration: 2,
                });
            }, 2000);
        }
    };
    const openMessageSave = (err: boolean, id: number) => {
        messageApi.open({
            key: keyTwo,
            type: "loading",
            content: "Подождите...",
        });
        if (!err) {
            setTimeout(() => {
                messageApi.open({
                    key: keyTwo,
                    type: "success",
                    content: (
                        <Link to={`/admin/object/list/listItem/${id}`}>
                            Перейти к списку
                        </Link>
                    ),
                    duration: 6,
                });
            }, 2000);
        } else {
            setTimeout(() => {
                messageApi.open({
                    key: keyTwo,
                    type: "error",
                    content: "Не удалось сохранить",
                    duration: 2,
                });
            }, 2000);
        }
    };

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
    const dataForEdit: IOneItemForListNameWork = {
        idNumber,
        name,
        description,
        typeWorkId,
        list,
    };
    const [createList, { data, isError: isErrorSave }] =
        listNameWorkApi.useCreateListMutation();
    const [
        editList,
        {
            data: dataEdit,
            isSuccess: isSuccessEdit,
            isError: isErrorEdit,
            isLoading: isLoadingEdit,
        },
    ] = listNameWorkApi.useEditListMutation();

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
    const [stateId, setStateId] = useState<number>(1);
    const {
        isError: isErrorMain,
        isLoading: isLoadingMain,
        lastAddedItem,
    } = useAppSelector((store) => store.nameWorkList);
    // Функция первого сохранения
    useEffect(() => {
        // Тестовая отправка
        if (idNumber !== null && idNumber !== undefined) {
            editList(dataForEdit);
        }
    }, []);
    const handleFirstSave = async () => {
        const res = await createList(dataForSave);
        const { data } = res as { data: INameListWork };
        dispatch(resetForOneItem());
        openMessageSave(isErrorSave, data.id ?? 0);
    };

    // Функция сохранения при редактировании

    const handleEdit = async () => {
        editList(dataForEdit);
        openMessageEdit(isErrorMain);
    };

    // Удаление
    // TODO Реализовать удаление
    return (
        <>
            {contextHolder}
            <div style={{ overflow: "auto", height: "90vh" }}>
                <Row style={{ margin: "10px 0" }}>
                    <Col style={{ marginRight: 10 }}>
                        {idNumber ? (
                            <Button type="primary" onClick={handleEdit}>
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
                            disabled={
                                idNumber || list?.length >= 1 ? true : false
                            }
                            options={dataOption}
                            onChange={handleSelectChange}
                        />
                    </Col>
                </Row>
                <EditTableForNewList form={form} />
            </div>
        </>
    );
};

export default ListForAddNameWork;
