import { Form } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { FormLogin } from "../../entities";
import { LayoutAuth } from "../../entities/layoutAuth";
import { authApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

const FormLoginFeatures = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [form] = Form.useForm();
    const data = Form.useWatch([], form);
    const { isAuth } = useAppSelector((state) => state.auth);
    if (isAuth) {
        navigate(location.state?.from || "/", { replace: true });
    }
    const [login, { isSuccess }] = authApi.useLoginMutation();
    const onFinish = async () => {
        const res = await login(data);
        console.log(res);
    };
    return (
        <LayoutAuth>
            <FormLogin form={form} onFinish={onFinish} />
        </LayoutAuth>
    );
};

export default FormLoginFeatures;
