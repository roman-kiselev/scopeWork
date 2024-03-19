import {
    Button,
    Form,
    Input,
    Select,
    SelectProps,
    Spin,
    Tag,
    message,
} from "antd";
import { objectsApi, userApi, userDescriptionApi } from "src/shared/api";

interface ICreateStorage {
    form: any;
    onFinish: () => void;
    isSuccessCreate: boolean;
    isError: boolean;
    isStorage: boolean;
    dataCheck: { statusCode: number; message: string } | null;
    isErrorCheck: boolean;
    name: string;
    isLoadingCheck: boolean;
}

const CreateStorage: React.FC<ICreateStorage> = ({
    form,
    onFinish,
    isError,
    isSuccessCreate,
    dataCheck,
    isStorage,
    isErrorCheck,
    name,
    isLoadingCheck,
}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data: dataObject } = objectsApi.useGetAllObjectShortQuery();
    const { data: dataUsers } = userApi.useGetAllUsersQuery();
    const { data: dataUserDescription } = userDescriptionApi.useGetAllQuery();
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
            value: 0,
        },
        ...optionObject,
    ];

    // if (isSuccessCreate) {
    //     messageApi.open({
    //         type: "success",
    //         content: "Склад успешно создан",
    //     });
    // }
    // const success = () => {
    //     messageApi.open({
    //       type: 'success',
    //       content: 'This is a success message',
    //     });
    //   };
    console.log(isErrorCheck);
    return (
        <>
            {/* {contextHolder} */}
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
                {isLoadingCheck ? (
                    <Spin />
                ) : !isErrorCheck && name !== "" && name !== undefined ? (
                    <Tag color="red">
                        Склад с таким наименованием уже существует
                    </Tag>
                ) : null}

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
                            <Select.Option key={item.value} value={item.value}>
                                {item.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="responsibleUser"
                    label="Выбрать ответственного"
                >
                    <Select>
                        {dataUserDescription?.map((item) => (
                            <Select.Option
                                key={item.userId}
                                value={item.userId}
                            >
                                {`${item.lastname} ${item.firstname}`}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                {isError ? (
                    <p style={{ color: "red" }}>Не удаётся создать склад</p>
                ) : null}
                {isSuccessCreate ? (
                    <Tag color="lime">Склад успешно создан</Tag>
                ) : null}

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateStorage;
