import { Row, Select, SelectProps } from "antd";
import React from "react";

interface SelectObjectProps {
    handleChange: (value: string) => void;
    defaultValue?: string;
    options: SelectProps["options"];
    disabled?: boolean;
}

const SelectObject: React.FC<SelectObjectProps> = ({
    handleChange,
    defaultValue,
    options,
    disabled = false,
}) => {
    return (
        <Row>
            <Select
                defaultValue={defaultValue}
                style={{ width: 250 }}
                placeholder="Выберите объект"
                onChange={handleChange}
                options={options}
                disabled={disabled}
            />
        </Row>
    );
};

export default SelectObject;
