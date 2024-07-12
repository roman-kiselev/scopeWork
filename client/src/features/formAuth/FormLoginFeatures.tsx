import { Form, Spin } from "antd";
import { Navigate, useLocation, useNavigate } from "react-router";
import { FormLogin } from "../../entities";
import { LayoutAuth } from "../../entities/layoutAuth";
import { authApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

const FormLoginFeatures = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const data = Form.useWatch([], form);

    // const [
    //     refreshToken,
    //     { isSuccess: isSuccessCheck, isLoading: isLoadingCheck },
    // ] = authApi.useRefreshMutation();

    // useEffect(() => {
    //     refreshToken();
    // }, []);

    const { dataError, isError, isLoading, isAuth, token } = useAppSelector(
        (state) => state.auth
    );

    const [login, { isLoading: isLoadingLogin }] = authApi.useLoginMutation();
    const onFinish = async () => {
        await login(data);
        navigate(location.state?.from || "/", { replace: true });
    };
    if (isLoading || isLoadingLogin) {
        return <Spin />;
    }
    // TODO проверить работу(в данный момент ошибка)
    if (isAuth && token) {
        // navigate(location.state?.from || "/", { replace: true });
        return <Navigate to="/" state={{ from: location }} replace={true} />;
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
