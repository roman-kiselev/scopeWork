import { Row, Select, SelectProps } from "antd";

interface SelectUserProps {
    handleChange: (arr: string[]) => void;
    defaultValue: string[] | null | undefined;
    options: SelectProps["options"];
    disabled?: boolean;
}

const SelectUser: React.FC<SelectUserProps> = ({
    defaultValue,
    handleChange,
    options,
    disabled = false,
}) => {
    return (
        <Row style={{ margin: "10px 0" }}>
            <Select
                mode="multiple"
                //allowClear
                style={{ width: "100%" }}
                placeholder="Выберите пользователя"
                defaultValue={defaultValue}
                onChange={handleChange}
                options={options}
                disabled={disabled}
            />
        </Row>
    );
};

export default SelectUser;
