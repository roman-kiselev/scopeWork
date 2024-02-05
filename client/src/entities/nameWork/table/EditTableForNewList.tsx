import { Form, Popconfirm, Space, Table, Typography } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { editList } from "../../../shared/models";
import EditableCell from "./EditableCell";

// Интерфейс одной строки
export interface Item {
    index: number;
    key: string;
    id: number;
    name: string;
    quntity: number;
}

interface EditTableForList {
    form: any;
    // cell: React.FC;
    // dataTable: Item[];
    //originalData: Item[];
}

const EditTableForNewList: React.FC<EditTableForList> = ({ form }) => {
    const dispatch = useAppDispatch();
    const { list: originalData } = useAppSelector(
        (store) => store.nameWorkList.oneItem
    );

    const [editingKey, setEditingKey] = useState("");
    // Функция выхода
    const cancel = () => {
        setEditingKey("");
    };

    //
    const isEditing = (record: Item) => record.key === editingKey;
    // Функция редактирования
    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: "", age: "", address: "", ...record });
        setEditingKey(record.key);
    };
    // Сохранение данных при изменении
    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;
            // Разворачиваем массив
            const newData = [...originalData];
            // Поиск по индексу
            const index = newData.findIndex((item) => key === item.key);
            // Если найдено
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                // Здесь через dispatch добавляем массив
                dispatch(editList(newData));
                //setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                dispatch(editList(newData));
                //setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const del = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;
            // Разворачиваем массив
            const newData = [...originalData];
            // Поиск по индексу
            const index = newData.findIndex((item) => key === item.key);
            // Если найдено
            if (index > -1) {
                const item = newData[index];
                const data = newData.filter((item) => item.key !== key);

                // Здесь через dispatch добавляем массив
                dispatch(editList(data));
                //setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                dispatch(editList(newData));
                //setData(newData);
                setEditingKey("");
            }
        } catch (e) {
            console.log("Validate Failed:", e);
        }
    };

    // Формируются колонки
    const columns = [
        {
            title: "Номер",
            dataIndex: "index",
            width: "15%",
            editable: false,
        },
        {
            title: "Наименование",
            dataIndex: "name",
            width: "45%",
            editable: false,
        },

        {
            title: "Количество",
            dataIndex: "quntity",
            width: "20%",
            editable: true,
        },
        {
            title: "Операции",
            dataIndex: "operation",
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{ marginRight: 8, fontSize: 12 }}
                        >
                            Сохранить
                        </Typography.Link>
                        <Popconfirm title="Вы уверены?" onConfirm={cancel}>
                            <a style={{ fontSize: 12 }}> Выход</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Space>
                        <Typography.Link
                            disabled={editingKey !== ""}
                            onClick={() => edit(record)}
                            style={{ fontSize: 12 }}
                        >
                            Редактировать
                        </Typography.Link>
                        <Typography.Link
                            disabled={editingKey !== ""}
                            onClick={() => del(record.key)}
                            style={{ fontSize: 12, color: "red" }}
                        >
                            Удалить
                        </Typography.Link>
                    </Space>
                );
            },
        },
    ];

    // Объединение колонок
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === "age" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={originalData}
                columns={mergedColumns}
                rowClassName="editable-row"
                scroll={{ y: 400 }}
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

export default EditTableForNewList;
