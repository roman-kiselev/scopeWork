import { SelectProps } from "antd";
import React, { useState } from "react";
import { objectsApi } from "src/shared/api";
import SelectObject from "./SelectObject";

interface ISelectObjectWithDataProps {
    handleChange: (value: string) => void;
}

const SelectObjectWithData: React.FC<ISelectObjectWithDataProps> = ({
    handleChange,
}) => {
    const { data: dataObject } = objectsApi.useGetAllObjectShortQuery();

    const [stateScopeWork, setStateScopeWork] = useState<
        SelectProps["options"]
    >([{ value: "0", label: "Выберите объём" }]);
    const optionObject: SelectProps["options"] =
        dataObject !== undefined
            ? dataObject.map(({ id, name }) => {
                  return {
                      label: name,
                      value: id,
                  };
              })
            : [];
    let optionFinishObject: SelectProps["options"] = [
        {
            label: "Выберите объект",
            value: "0",
        },
        ...optionObject,
    ];

    return (
        <SelectObject
            handleChange={handleChange}
            options={optionFinishObject}
            defaultValue="Выберите объект"
            disabled={false}
        />
    );
};

export default SelectObjectWithData;
