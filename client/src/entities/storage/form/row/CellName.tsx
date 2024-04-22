import { SettingOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Row } from "antd";
import React, { useState } from "react";
import { nameWorkApi } from "src/shared/api";
import { useAppDispatch, useAppSelector } from "src/shared/hooks";
import { editRow } from "src/shared/models";

interface ICellNameProps {
    cellKey: string;
    handleViewModal: () => void;
}

const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
});

const CellName: React.FC<ICellNameProps> = ({ cellKey, handleViewModal }) => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((store) => store.orders.orderReceipt);
    const findedData = data.find((item) => item.key === cellKey);

    const [nameState, setNameString] = useState<string>("");

    const { data: dataText } = nameWorkApi.useFindNameWorkQuery(
        { text: nameState },
        { refetchOnMountOrArgChange: true }
    );
    console.log(dataText);
    const [options, setOptions] = useState<{ value: string }[]>([]);

    const getPanelValue = (searchText: string) => (!searchText ? [] : dataText);

    const handleEdit = (value: string) => {
        setNameString(value);
        dispatch(editRow({ key: cellKey, nameField: "name", value: value }));
    };

    const onSelect = (data: string) => {
        console.log("onSelect", data);
    };

    const handleEditName = (text: string) => {
        const data =
            dataText && dataText !== undefined
                ? dataText.map((item: any) => {
                      return { value: item.name };
                  })
                : [];
        setNameString(text);
        setOptions(data);
    };

    // useEffect(() => {
    //     let timeoutId: any;
    //     if (timeoutId) {
    //         clearTimeout(timeoutId);
    //     }
    //     timeoutId = setTimeout(() => {
    //         setNameEdit(name);
    //     }, 1000);
    //     return () => clearTimeout(timeoutId);
    // }, [name]);

    return (
        <Row style={{ justifyContent: "center" }}>
            <AutoComplete
                options={options}
                style={{ width: "80%" }}
                popupMatchSelectWidth={540}
                onSelect={onSelect}
                // onSearch={(text) => setOptions(getPanelValue(text))}
                onSearch={(text) => handleEditName(text)}
                placeholder="Введите наименование"
            />
            <Button onClick={handleViewModal}>
                <SettingOutlined />
            </Button>
        </Row>
    );
};

export default CellName;
