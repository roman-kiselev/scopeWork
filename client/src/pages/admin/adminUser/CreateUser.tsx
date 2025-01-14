import { Button, Card, Form, Row } from "antd";
import { authApi } from "../../../shared/api";
import {
    IInputFormItemProps,
    IInputPasswordFormItemProps,
} from "../../../shared/interfaces";
import { InputFormItem, InputPasswordFormItem } from "../../../shared/ui";

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
const propsFirstname: IInputFormItemProps = {
    input: {
        placeholder: "Иван",
        type: "nickname",
        size: "large",
    },
    name: "firstname",
    label: "Имя",
    tooltip: "Введите ваше имя",
    rules: [
        {
            required: true,
            message: "Обязательное поле",
            whitespace: true,
        },
    ],
};
const propsLastname: IInputFormItemProps = {
    input: {
        placeholder: "Иванов",
        type: "nickname",
        size: "large",
    },
    name: "lastname",
    label: "Фамилия",
    tooltip: "Введите вашу фамилию",
    rules: [
        {
            required: true,
            message: "Обязательное поле",
            whitespace: true,
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
const propsConfirm: IInputPasswordFormItemProps = {
    input: {
        placeholder: "Повторно пароль",
        type: "password",
        size: "large",
    },
    label: "Ещё раз",
    name: "confirm",
    dependencies: ["password"],
    rules: [
        {
            required: true,
            message: "Введите пароль ещё раз",
        },
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают"));
            },
        }),
    ],
};

const CreateUser = () => {
    const [form] = Form.useForm();
    const data = Form.useWatch([], form);
    const [registered] = authApi.useRegisterMutation();
    const onFinish = async () => {
        await registered(data);
    };
    return (
        <>
            <Card
                title="Создание пользователя"
                bordered={true}
                style={{ maxWidth: 400 }}
            >
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
                    <InputPasswordFormItem
                        input={propsConfirm.input}
                        name={propsConfirm.name}
                        label={propsConfirm.label}
                        tooltip={propsConfirm.tooltip}
                        rules={propsConfirm.rules}
                    />
                    <InputFormItem
                        input={propsFirstname.input}
                        name={propsFirstname.name}
                        label={propsFirstname.label}
                        tooltip={propsFirstname.tooltip}
                        rules={propsFirstname.rules}
                    />
                    <InputFormItem
                        input={propsLastname.input}
                        name={propsLastname.name}
                        label={propsLastname.label}
                        tooltip={propsLastname.tooltip}
                        rules={propsLastname.rules}
                    />
                    <Row style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit">
                            Создать
                        </Button>
                    </Row>
                </Form>
            </Card>
        </>
    );
};

export default CreateUser;
