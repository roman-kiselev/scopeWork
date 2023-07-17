import React from "react";
import { Form } from "antd";
import Input from "antd/es/input";
import { IInputFormItemProps } from "../../interfaces";

const InputFormItem: React.FC<IInputFormItemProps> = ({
    input,
    name,
    label,
    tooltip,
    rules,
}) => {
    return (
        <>
            <Form.Item
                name={name}
                label={label}
                tooltip={tooltip}
                rules={rules}
            >
                <Input
                    placeholder={input ? input.placeholder : ""}
                    type={input ? input.type : "text"}
                    size={input ? input.size : "large"}
                />
            </Form.Item>
        </>
    );
};

export default InputFormItem;
