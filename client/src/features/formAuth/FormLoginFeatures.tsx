import { Form, Spin } from "antd";
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

    const {
        isSuccess: isSuccessCheck,
        isLoading: isLoadingCheck,
        data: dataCheck,
    } = authApi.useCheckQuery();
    const { dataError, isError, isLoading, isAuth, token } = useAppSelector(
        (state) => state.auth
    );
    // useEffect(() => {
    //     if (isAuth) {
    //         navigate(location.state?.from || "/", { replace: true });
    //     }
    // }, []);

    // Извлечение токена при загрузке страницы
    // const storedToken = localStorage.getItem("token");
    // if (storedToken && isSuccessCheck) {
    //     navigate(location.state?.from || "/", { replace: true });
    // }
    // useEffect(() => {
    //     if (isSuccessCheck && token !== null) {
    //         navigate(location.state?.from || "/", { replace: true });
    //     }
    // }, [isSuccessCheck, navigate]);
    //const dataRes = useQuery("checkQuery", () => authApi.useCheckQuery().data);
    //const dataRes = authApi.useCheckQuery().data;
    const [login, { isSuccess, isLoading: isLoadingLogin }] =
        authApi.useLoginMutation();
    const onFinish = async () => {
        await login(data);
        navigate(location.state?.from || "/", { replace: true });
    };
    if (isLoading || isLoadingCheck || isLoadingLogin) {
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
