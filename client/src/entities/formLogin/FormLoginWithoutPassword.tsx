import { Button, Card, Form, Row, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IDataError, IInputFormItemProps } from "../../shared/interfaces";
import { InputFormItem } from "../../shared/ui";

const { Text } = Typography;

const propsEmail: IInputFormItemProps = {
    input: {
        placeholder: "email@email.ru",
        type: "email",
        size: "large",
    },
    name: "email",
    label: "Почта",
    tooltip: "Введите почту",
    rules: [
        {
            required: true,
            message: "Введите почту",
        },
        {
            type: "email",
            message: "Введите корректную почту",
        },
    ],
};

interface IFormLoginProps {
    form: any;
    onFinish: (values: any) => void;
    isError: boolean;
    dataError: IDataError | null;
}

const FormLoginWithoutPassword: React.FC<IFormLoginProps> = ({
    form,
    onFinish,
    isError,
    dataError,
}) => {
    const [stateClickOtpCode, setStateClickOtpCode] = useState(false);

    return (
        <>
            <Card title="Вход" bordered={true} style={{ maxWidth: 400 }}>
                <Form form={form} name="register" onFinish={onFinish}>
                    <InputFormItem
                        input={propsEmail.input}
                        name={propsEmail.name}
                        label={propsEmail.label}
                        tooltip={propsEmail.tooltip}
                        rules={propsEmail.rules}
                    />

                    <Row
                        style={{
                            marginTop: 10,
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Отправить код на почту
                        </Button>
                    </Row>

                    <Row style={{ marginTop: 20 }}>
                        <Link to={"/login"}>Войти c паролем</Link>
                    </Row>
                    <Row>
                        <Text>Нет аккаунта?</Text>
                        <Link to={"/register"}>Зарегистрироваться</Link>
                    </Row>

                    {/* <Row style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit">
                            Вход
                        </Button>
                    </Row> */}
                </Form>
            </Card>
        </>
    );
};

export default FormLoginWithoutPassword;
