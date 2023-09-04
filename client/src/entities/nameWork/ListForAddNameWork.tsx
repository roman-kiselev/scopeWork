import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useState } from "react";

interface Item {
    key: string;
    id: number;
    name: string;
    quantity: number;
}

const originalDataTwo: Item[] = [
    {
        id: 1,
        key: "1",
        name: "Кран 50",
        quantity: 1,
    },
    {
        id: 2,
        key: "2",
        name: "Кран 510",
        quantity: 1,
    },
    {
        id: 3,
        key: "3",
        name: "Кран 300",
        quantity: 1,
    },
];

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Введите ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const ListForAddNameWork = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originalDataTwo);
    const [editingKey, setEditingKey] = useState("");

    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: "", age: "", address: "", ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const columns = [
        {
            title: "Номер",
            dataIndex: "id",
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
            dataIndex: "quantity",
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
                    <Typography.Link
                        disabled={editingKey !== ""}
                        onClick={() => edit(record)}
                        style={{ fontSize: 12 }}
                    >
                        Редактировать
                    </Typography.Link>
                );
            },
        },
    ];

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
        <div style={{ overflow: "auto", height: "90vh" }}>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    scroll={{ y: 400 }}
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </div>
    );
};

export default ListForAddNameWork;
