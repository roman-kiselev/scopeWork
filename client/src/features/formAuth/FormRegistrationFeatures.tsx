import { Form } from "antd";
import { useNavigate } from "react-router";
import { FormRegister } from "../../entities";
import { LayoutAuth } from "../../entities/layoutAuth";
import { authApi } from "../../shared/api";

const FormRegistrationFeatures = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const data = Form.useWatch([], form);

    const [registered, { isSuccess }] = authApi.useRegisterMutation();
    const onFinish = async () => {
        const res = await registered(data);

        if (isSuccess) {
            navigate("/");
        }
    };

    return (
        <LayoutAuth>
            <FormRegister form={form} onFinish={onFinish} />
        </LayoutAuth>
    );
};

export default FormRegistrationFeatures;
