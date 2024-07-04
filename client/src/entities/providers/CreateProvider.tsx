import { Button, Col, Form, Input, Row, Select, Spin } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { providerApi } from "src/shared/api";
import { ITransportCompany } from "src/shared/interfaces";
const { Option } = Select;

interface IForm {
    name: string;
    address: string;
    transportCompanyId: number[];
    transportCompanyDefault: number;
}

interface CreateProviderProps {
    handleOpen: () => void;
    dataTransportCompany: ITransportCompany[] | [];
}

const CreateProvider: React.FC<CreateProviderProps> = ({
    handleOpen,
    dataTransportCompany,
}) => {
    const [stateSelect, setStateSelect] = useState<ITransportCompany[] | []>(
        []
    );
    const [form] = useForm<IForm>();
    const dataForm: IForm = useWatch([], form);
    useEffect(() => {
        const selectedData = form.getFieldValue("transportCompanyId");
        const dataForDefault = [];
        if (selectedData) {
            for (let i = 0; i < selectedData.length; i++) {
                const findedData = dataTransportCompany.find(
                    (item) => item.id === selectedData[i]
                );
                if (findedData) {
                    dataForDefault.push(findedData);
                }
            }
            setStateSelect(dataForDefault);
        }
    }, [dataForm]);

    const [
        createProvider,
        {
            isLoading: isLoadingCreateProvider,
            isError: isErrorCreateProvider,
            isSuccess: isSuccessCreateProvider,
        },
    ] = providerApi.useCreateWithTkMutation();

    if (isSuccessCreateProvider) {
        form.resetFields();
    }
    const handleCreate = () => {
        console.log(dataForm);
        createProvider(dataForm);
    };

    return (
        <Row style={{ width: "100%" }}>
            <Col sm={24} xl={24} md={24} lg={18}>
                <Form form={form} onFinish={handleCreate}>
                    <Form.Item
                        label="Название"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Пожалуйста, введите название!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Адрес"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: "Пожалуйста, введите адрес!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Row>
                        <Col style={{ width: "70%" }}>
                            <Form.Item
                                name="transportCompanyId"
                                label="Выбор транспортной компании"
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Можно выбрать более одной"
                                >
                                    {dataTransportCompany.map((item) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Button onClick={handleOpen}>Создать ТК</Button>
                        </Col>
                    </Row>

                    {stateSelect.length > 0 && (
                        <Form.Item
                            name="transportCompanyDefault"
                            label="ТК по умолчанию"
                        >
                            <Select placeholder="Выберите ТК по умолчанию">
                                {stateSelect.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}

                    {isLoadingCreateProvider ? (
                        <Spin />
                    ) : (
                        <Form.Item>
                            <Button htmlType="submit" type="primary">
                                Создать
                            </Button>
                        </Form.Item>
                    )}
                    {isErrorCreateProvider && (
                        <p style={{ color: "red" }}>Произошла ошибка</p>
                    )}
                </Form>
            </Col>
        </Row>
    );
};

export default CreateProvider;
