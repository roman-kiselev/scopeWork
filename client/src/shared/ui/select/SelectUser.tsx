import { Row, Select, SelectProps } from "antd";

const options: SelectProps["options"] = [
    {
        label: "Иванов И.И.",
        value: "1",
    },
    {
        label: "Петров П.В.",
        value: "2",
    },
    {
        label: "Сидоров П.В.",
        value: "3",
    },
    {
        label: "Шишкин П.В.",
        value: "4",
    },
];

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
