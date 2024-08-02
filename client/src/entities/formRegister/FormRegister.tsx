import { Button, Card, Form, Row, Spin, Typography } from "antd";
import { FormInstance } from "antd/lib/form";
import React, { useEffect, useState } from "react";
import { Link as LinkDom } from "react-router-dom";
import { mailApi } from "src/shared/api";
import {
    IInputFormItemProps,
    IInputPasswordFormItemProps,
} from "../../shared/interfaces";
import { InputFormItem, InputPasswordFormItem } from "../../shared/ui";

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

const propsOrganizationName: IInputFormItemProps = {
    input: {
        placeholder: "ООО 'РогАиКопыта'",
        type: "nickname",
        size: "large",
    },
    name: "nameOrganization",
    label: "Наименование организации",
    tooltip: "Введите наименование организации",
    rules: [
        {
            required: true,
            message: "Обязательное поле",
            whitespace: true,
        },
    ],
};

const propsOrganizationAddress: IInputFormItemProps = {
    input: {
        placeholder: "г. Москва, ул. Ленина, д. 1",
        type: "nickname",
        size: "large",
    },
    name: "addressOrganization",
    label: "Адрес организации",
    tooltip: "Введите адрес организации",
    rules: [
        {
            required: true,
            message: "Обязательное поле",
            whitespace: true,
        },
    ],
};

const propsOtpCode: IInputFormItemProps = {
    input: {
        placeholder: "123456",
        type: "code",
        size: "large",
    },
    name: "code",
    label: "Код",
    tooltip: "Введите код",
    rules: [
        {
            required: true,
            message: "Введите код",
        },
    ],
};

interface IFormRegisterProps {
    form: FormInstance<any>;
    onFinish: (values: any) => void;
    isLoading: boolean;
    isError: boolean;
}

const FormRegister: React.FC<IFormRegisterProps> = ({
    form,
    onFinish,
    isLoading,
    isError,
}) => {
    const [stateClickOtpCode, setStateClickOtpCode] = useState(false);
    const [timer, setTimer] = useState(60);
    const [sendOtp, { isLoading: isLoadingSendOtp }] =
        mailApi.useSendOtpMutation();
    const onFinishSendOtp = async () => {
        await sendOtp({ email: form.getFieldValue("email") });
        setStateClickOtpCode(true);
    };

    useEffect(() => {
        let countdown: any;
        if (stateClickOtpCode && timer > 0) {
            countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [stateClickOtpCode, timer]);
    if (timer === 0) {
        setStateClickOtpCode(false);
        setTimer(60);
    }

    return (
        <>
            <Card title="Регистрация" bordered={true} style={{ width: "50vw" }}>
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
                    <InputFormItem
                        input={propsOrganizationName.input}
                        name={propsOrganizationName.name}
                        label={propsOrganizationName.label}
                        tooltip={propsOrganizationName.tooltip}
                        rules={propsOrganizationName.rules}
                    />
                    <InputFormItem
                        input={propsOrganizationAddress.input}
                        name={propsOrganizationAddress.name}
                        label={propsOrganizationAddress.label}
                        tooltip={propsOrganizationAddress.tooltip}
                        rules={propsOrganizationAddress.rules}
                    />
                    {stateClickOtpCode && (
                        <InputFormItem
                            input={propsOtpCode.input}
                            name={propsOtpCode.name}
                            label={propsOtpCode.label}
                            tooltip={propsOtpCode.tooltip}
                            rules={propsOtpCode.rules}
                        />
                    )}
                    {isLoadingSendOtp ? (
                        <Spin />
                    ) : (
                        <>
                            {stateClickOtpCode && (
                                <>
                                    <Row
                                        style={{
                                            marginTop: 20,
                                            justifyContent: "center",
                                        }}
                                    >
                                        {timer > 0 ? (
                                            `Код будет действителен еще ${timer} секунд`
                                        ) : (
                                            <></>
                                        )}
                                    </Row>
                                </>
                            )}

                            {!stateClickOtpCode && (
                                <Row
                                    style={{
                                        marginTop: 10,
                                        justifyContent: "center",
                                        width: "100%",
                                    }}
                                >
                                    <Button
                                        onClick={onFinishSendOtp}
                                        type="primary"
                                        disabled={
                                            !form.getFieldValue("email") ||
                                            !form.isFieldsTouched(
                                                ["email"],
                                                true
                                            ) ||
                                            !!form.getFieldError("email").length
                                        }
                                    >
                                        Отправить код на почту
                                    </Button>
                                </Row>
                            )}

                            {/* {stateClickOtpCode && (
                                <Row style={{ marginTop: 10 }}>
                                    <Button
                                        type="primary"
                                        onClick={onFinish}
                                        disabled={timer === 0}
                                    >
                                        Войти с кодом
                                    </Button>
                                </Row>
                            )} */}
                        </>
                    )}

                    <Row>
                        <Text>У Вас уже есть аккаунт?</Text>
                        <LinkDom to={"/login"}>Войти</LinkDom>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                        {isError ? <p>Ошибка регистрации</p> : null}
                        {isLoading ? (
                            <Spin />
                        ) : (
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={!stateClickOtpCode}
                            >
                                Зарегистрироваться
                            </Button>
                        )}
                    </Row>
                </Form>
            </Card>
        </>
    );
};

export default FormRegister;
