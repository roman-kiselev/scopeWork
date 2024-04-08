import { Button, Form, Input, Row, Spin } from "antd";

interface CreateTransportCompanyProps {
    handleFinish: () => void;
    form: any;
    isSuccess?: boolean;
    isError?: boolean;
    isLoading?: boolean;
}

const CreateTransportCompany: React.FC<CreateTransportCompanyProps> = ({
    form,
    handleFinish,
    isError,
    isSuccess,
    isLoading,
}) => {
    return (
        <Row>
            <Form form={form} onFinish={handleFinish}>
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
                {isError && <p style={{ color: "red" }}>Произошла ошибка</p>}
                {isSuccess && <p style={{ color: "green" }}>Успешно создано</p>}
                {isLoading ? (
                    <Spin />
                ) : (
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Создать
                        </Button>
                    </Form.Item>
                )}
            </Form>
        </Row>
    );
};

export default CreateTransportCompany;
