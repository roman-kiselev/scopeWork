import React from "react";
import { Form, Card, Button, Typography, Row } from "antd";
import { InputFormItem, InputPasswordFormItem } from "../../shared/ui";
import { Link as LinkDom } from "react-router-dom";
import {
    IInputFormItemProps,
    IInputPasswordFormItemProps,
} from "../../shared/interfaces";
const { Link, Text } = Typography;

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
const propsPassword: IInputPasswordFormItemProps = {
    input: {
        placeholder: "Пароль",
        type: "password",
        size: "large",
    },
    label: "Пароль",
    name: "password",
    rules: [
        {
            required: true,
            message: "Введите пароль",
        },
    ],
};

interface IFormLoginProps {
    form: any;
    onFinish: (values: any) => void;
}

const FormLogin: React.FC<IFormLoginProps> = ({ form, onFinish }) => {
    // const [form] = Form.useForm();
    // const data = Form.useWatch([], form);

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
                    <InputPasswordFormItem
                        input={propsPassword.input}
                        name={propsPassword.name}
                        label={propsPassword.label}
                        tooltip={propsPassword.tooltip}
                        rules={propsPassword.rules}
                    />
                    <Row>
                        <Text>Нет аккаунта?</Text>
                        <LinkDom to={"/register"}>Зарегистрироваться</LinkDom>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit">
                            Вход
                        </Button>
                    </Row>
                </Form>
            </Card>
        </>
    );
};

export default FormLogin;
