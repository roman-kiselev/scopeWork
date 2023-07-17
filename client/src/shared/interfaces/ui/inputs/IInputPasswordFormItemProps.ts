import { IInputProps } from "./IInputProps";
import { Rule } from "antd/lib/form";

export interface IInputPasswordFormItemProps {
    input: IInputProps;
    name: string;
    label: string;
    tooltip?: string;
    dependencies?: string[];
    rules?: Rule[];
}
