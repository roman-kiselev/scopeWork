import { IInputProps } from "./IInputProps";
import { RuleObject } from "antd/lib/form";

export interface IInputFormItemProps {
    input: IInputProps;
    name: string;
    label: string;
    tooltip?: string;
    rules: RuleObject[];
}
