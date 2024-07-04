import { Form, Spin } from "antd";
import { useEffect } from "react";
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

    const [
        refreshToken,
        { isSuccess: isSuccessCheck, isLoading: isLoadingCheck },
    ] = authApi.useRefreshMutation();

    useEffect(() => {
        refreshToken();
    }, [refreshToken]);

    const { dataError, isError, isLoading } = useAppSelector(
        (state) => state.auth
    );

    const [login, { isLoading: isLoadingLogin }] = authApi.useLoginMutation();
    const onFinish = async () => {
        await login(data);
        navigate(location.state?.from || "/", { replace: true });
    };
    if (isLoading || isLoadingCheck || isLoadingLogin) {
        return <Spin />;
    }
    if (isSuccessCheck) {
        navigate(location.state?.from || "/", { replace: true });
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
