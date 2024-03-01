import { Button, Form, Input, Select, SelectProps } from "antd";
import { objectsApi, userApi } from "src/shared/api";

interface ICreateStorage {
    form: any;
    onFinish: () => void;
}

const CreateStorage: React.FC<ICreateStorage> = ({ form, onFinish }) => {
    const { data: dataObject } = objectsApi.useGetAllObjectShortQuery();
    const { data: dataUsers } = userApi.useGetAllUsersQuery();
    const optionObject: SelectProps["options"] =
        dataObject !== undefined
            ? dataObject.map(({ id, name }) => {
                  return {
                      label: name,
                      value: id,
                  };
              })
            : [];
    let optionFinishObject: SelectProps["options"] = [
        {
            label: "Выберите объект",
            value: "0",
        },
        ...optionObject,
    ];

    return (
        <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ width: "50vw" }}
        >
            <Form.Item
                name="name"
                label="Наименование склада"
                rules={[
                    {
                        required: true,
                        message: "Наименование обязательное поле",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="address"
                label="Адрес склада"
                rules={[
                    {
                        required: true,
                        message: "Адрес обязательное поле",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="object" label="Прикрепить к объекту">
                <Select>
                    {optionFinishObject.map((item) => (
                        <Select.Option value={item.value}>
                            {item.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="responsibleUser" label="Выбрать ответственного">
                <Select>
                    {dataUsers?.map((item) => (
                        <Select.Option value={item.id}>
                            {item.email}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Создать
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateStorage;
