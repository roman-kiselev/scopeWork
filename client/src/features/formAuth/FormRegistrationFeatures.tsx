import React from "react";
import { Form } from "antd";
import { authApi } from "../../shared/api";
import { LayoutAuth } from "../../entities/layoutAuth";
import { FormRegister } from "../../entities";

const FormRegistrationFeatures = () => {
    const [form] = Form.useForm();
    const data = Form.useWatch([], form);

    const [registered, { isSuccess }] = authApi.useRegisterMutation();
    const onFinish = async () => {
        const res = await registered(data);
        console.log(res);
    };

    return (
        <LayoutAuth>
            <FormRegister form={form} onFinish={onFinish} />
        </LayoutAuth>
    );
};

export default FormRegistrationFeatures;
