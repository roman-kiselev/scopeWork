import { Button, Card, Form, Row, Spin, Typography } from "antd";
import { FormInstance } from "antd/lib/form";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mailApi } from "src/shared/api";
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

interface IFormLoginProps {
    form: FormInstance<any>;
    onFinish: (values: any) => void;
    isError: boolean;
    dataError: IDataError | null;
}

const FormLoginWithoutPassword: React.FC<IFormLoginProps> = ({
    form,
    onFinish,
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
            <Card title="Вход" bordered={true} style={{ maxWidth: 400 }}>
                <Form form={form} name="register" onFinish={onFinish}>
                    <InputFormItem
                        input={propsEmail.input}
                        name={propsEmail.name}
                        label={propsEmail.label}
                        tooltip={propsEmail.tooltip}
                        rules={propsEmail.rules}
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

                            {stateClickOtpCode && (
                                <Row style={{ marginTop: 10 }}>
                                    <Button
                                        type="primary"
                                        onClick={onFinish}
                                        disabled={timer === 0}
                                    >
                                        Войти с кодом
                                    </Button>
                                </Row>
                            )}
                        </>
                    )}

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
