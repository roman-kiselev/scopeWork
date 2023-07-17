import React from "react";
import { Form } from "antd";
import Input from "antd/es/input";
import { IInputPasswordFormItemProps } from "../../interfaces";

const InputPasswordFormItem: React.FC<IInputPasswordFormItemProps> = ({
    input,
    name,
    label,
    dependencies,
    rules,
}) => {
    return (
        <>
            <Form.Item
                name={name}
                label={label}
                rules={rules}
                dependencies={dependencies}
                hasFeedback
            >
                <Input.Password
                    placeholder={input ? input.placeholder : ""}
                    size={input ? input.size : "large"}
                />
            </Form.Item>
        </>
    );
};

export default InputPasswordFormItem;
