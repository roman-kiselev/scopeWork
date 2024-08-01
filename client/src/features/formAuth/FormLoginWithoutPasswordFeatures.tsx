import { Form, Spin } from "antd";
import { Navigate, useLocation, useNavigate } from "react-router";
import { FormLoginWithoutPassword } from "src/entities";
import { LayoutAuth } from "src/entities/layoutAuth";
import { authApi } from "src/shared/api";
import { useAppSelector } from "src/shared/hooks";

const FormLoginWithoutPasswordFeatures = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const data = Form.useWatch([], form);
    // console.log(form.getFieldValue("email"));
    const { dataError, isError, isLoading, isAuth, token } = useAppSelector(
        (state) => state.auth
    );

    const [login, { isLoading: isLoadingLogin }] =
        authApi.useLoginWithoutPasswordMutation();
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
        return (
            <Navigate
                to={location.state?.from || "/"}
                state={{ from: location }}
                replace={true}
            />
        );
    }

    return (
        <LayoutAuth>
            <FormLoginWithoutPassword
                form={form}
                onFinish={onFinish}
                dataError={dataError}
                isError={isError}
            />
        </LayoutAuth>
    );
};

export default FormLoginWithoutPasswordFeatures;
