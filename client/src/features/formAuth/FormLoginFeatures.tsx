import { Form, Spin } from "antd";
import React, { useEffect } from "react";
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

    const { isSuccess: isSuccessCheck, isLoading: isLoadingCheck } =
        authApi.useCheckQuery();
    const { dataError, isError, isLoading } = useAppSelector(
        (state) => state.auth
    );
    useEffect(() => {
        if (isSuccessCheck) {
            navigate(location.state?.from || "/", { replace: true });
        }
    }, [isSuccessCheck, navigate]);

    const [login, { isSuccess }] = authApi.useLoginMutation();
    const onFinish = async () => {
        const res = await login(data);
        console.log(res);
    };
    if (isLoading || isLoadingCheck) {
        return <Spin />;
    }
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
