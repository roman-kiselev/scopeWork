import { Form } from "antd";
import React from "react";
import { FormLogin } from "../../entities";
import { LayoutAuth } from "../../entities/layoutAuth";
import { authApi } from "../../shared/api";

const FormLoginFeatures = () => {
    const [form] = Form.useForm();
    const data = Form.useWatch([], form);
    console.log(data);
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
