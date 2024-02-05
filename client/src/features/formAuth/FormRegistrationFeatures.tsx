import { Form } from "antd";
import { FormRegister } from "../../entities";
import { LayoutAuth } from "../../entities/layoutAuth";
import { authApi } from "../../shared/api";

const FormRegistrationFeatures = () => {
    const [form] = Form.useForm();
    const data = Form.useWatch([], form);

    const [registered, { isSuccess }] = authApi.useRegisterMutation();
    const onFinish = async () => {
        const res = await registered(data);
    };

    return (
        <LayoutAuth>
            <FormRegister form={form} onFinish={onFinish} />
        </LayoutAuth>
    );
};

export default FormRegistrationFeatures;
