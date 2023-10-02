import { Row, Select, SelectProps } from "antd";
import React from "react";

interface SelectTypeWorkProps {
    defaultValue?: string;
    options: SelectProps["options"];
    disabled?: boolean;
    handleChange: (value: string) => void;
}

const SelectTypeWork: React.FC<SelectTypeWorkProps> = ({
    defaultValue,
    handleChange,
    options,
    disabled = false,
}) => {
    return (
        <Row style={{ margin: "10px 0" }}>
            <Select
                defaultValue={defaultValue}
                style={{ width: 180 }}
                placeholder="Выберите тип работ"
                disabled={disabled}
                options={options}
                onChange={handleChange}
            />
        </Row>
    );
};

export default SelectTypeWork;
