import { Button, Form, Input, Row, Select, SelectProps, Spin } from "antd";
import { useForm, useWatch } from "antd/lib/form/Form";
import { useEffect } from "react";
import { objectsApi, storageApi, userDescriptionApi } from "src/shared/api";
import { RoleString } from "src/shared/config";
import { useAppSelector } from "src/shared/hooks";
import { checkRole } from "src/shared/utils";

interface IFormStorage {
    name: string;
    address: string;
    object: number;
    responsibleUser: number;
}

interface IStorageDescriptionShort {
    idStorage: number;
}

const checkData = (data: IFormStorage, dataForm: IFormStorage) => {
    let flag = true;
    // Сравним данные
    if (data !== undefined && dataForm !== undefined) {
        if (data.name !== dataForm.name) {
            flag = false;
        }
        if (data.address !== dataForm.address) {
            flag = false;
        }
        if (data.object !== dataForm.object) {
            flag = false;
        }
        if (data.responsibleUser !== dataForm.responsibleUser) {
            flag = false;
        }
    }
    return flag;
};

const StorageDescriptionShort: React.FC<IStorageDescriptionShort> = ({
    idStorage,
}) => {
    const { data, isSuccess, isError, isLoading } =
        storageApi.useGetOneByIdQuery({ id: idStorage });

    const currentData: IFormStorage = {
        name: data ? data.name : "",
        address: data ? data.address : "",
        object: data && data.objects.length > 0 ? data.objects[0].id : 0,
        responsibleUser: data && data.users.length > 0 ? data.users[0].id : 0,
    };
    const [form] = useForm<IFormStorage>();
    useEffect(() => {
        form.setFieldsValue({
            name: data?.name,
            address: data?.address,
            object: data && data.objects.length > 0 ? data.objects[0].id : 0,
            responsibleUser:
                data && data.users.length > 0 ? data.users[0].id : 0,
        });
    }, [data]);

    const dataForm: IFormStorage = useWatch([], form);
    const { roles } = useAppSelector((store) => store.auth);
    const { data: dataObject } = objectsApi.useGetAllObjectShortQuery();

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

    if (isLoading) {
        return <Spin />;
    }

    return (
        <Row>
            <Form form={form} style={{ width: "50vw" }}>
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
                    <Input
                        // defaultValue={data?.name}
                        disabled={
                            checkRole(roles, RoleString.ADMIN) ? false : true
                        }
                    />
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
                    <Input
                        // defaultValue={data?.address}
                        disabled={
                            checkRole(roles, RoleString.ADMIN) ? false : true
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="object"
                    label="Объект"
                    // initialValue={data?.objects[0].id}
                >
                    <Select
                        disabled={
                            checkRole(roles, RoleString.ADMIN) ? false : true
                        }
                    >
                        {optionFinishObject.map((item) => (
                            <Select.Option key={item.value} value={item.value}>
                                {item.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="responsibleUser"
                    label="Ответственный"
                    // initialValue={data?.users[0].id}
                >
                    <Select
                        disabled={
                            checkRole(roles, RoleString.ADMIN) ? false : true
                        }
                    >
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
                {checkData(currentData, dataForm) ? null : (
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Сохранить изменения
                        </Button>
                    </Form.Item>
                )}
            </Form>
        </Row>
    );
};

export default StorageDescriptionShort;
