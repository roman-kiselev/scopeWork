import { Form } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { FormLogin } from "../../entities";
import { LayoutAuth } from "../../entities/layoutAuth";
import { authApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

const FormLoginFeatures = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const data = Form.useWatch([], form);
    const { isAuth, dataError, isError } = useAppSelector(
        (state) => state.auth
    );
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
            <FormLogin
                isError={isError}
                dataError={dataError}
                form={form}
                onFinish={onFinish}
            />
        </LayoutAuth>
    );
};

export default FormLoginFeatures;
