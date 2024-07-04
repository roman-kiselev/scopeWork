import { SettingOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Typography } from "antd";
import React from "react";
import { INameWorkShort } from "src/shared/interfaces";

interface ICellNameProps {
    cellKey: string;
    handleViewModal?: () => void;
    dataName: INameWorkShort | null;
    disabled?: boolean;
}

const CellName: React.FC<ICellNameProps> = ({
    handleViewModal,
    dataName,
    disabled = false,
}) => {
    //const { data } = useAppSelector((store) => store.orders.orderReceipt);
    //const findedData = data.find((item) => item.key === cellKey);

    // const [nameState, setNameString] = useState<string>("");

    // const { data: dataText } = nameWorkApi.useFindNameWorkQuery(
    //     { text: nameState },
    //     { refetchOnMountOrArgChange: true }
    // );

    // const [options, setOptions] = useState<{ id: number; value: string }[]>([]);

    // const getPanelValue = (searchText: string) => (!searchText ? [] : dataText);

    // const handleEdit = (value: string) => {
    //     setNameString(value);
    //     dispatch(editRow({ key: cellKey, nameField: "name", value: value }));
    // };

    // const onSelect = (data: string) => {
    //     console.log(data);
    //     console.log(dataText);

    //     const findedData = options.find((item) => item.value === data);
    //     if (findedData) {
    //         dispatch(
    //             editRow({
    //                 key: cellKey,
    //                 nameField: "name",
    //                 value: {
    //                     id: findedData.id,
    //                     name: findedData.value,
    //                 },
    //             })
    //         );
    //     }
    // };

    // const handleEditName = (text: string) => {
    //     const data =
    //         dataText && dataText !== undefined
    //             ? dataText.map((item: any) => {
    //                   return { id: item.id, value: item.name };
    //               })
    //             : [];
    //     setNameString(text);
    //     setOptions(data);
    // };

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
        <Row
            style={{
                width: "100%",
            }}
        >
            {/* <AutoComplete
                options={options}
                style={{ width: "80%" }}
                popupMatchSelectWidth={540}
                onSelect={onSelect}
                // onSearch={(text) => setOptions(getPanelValue(text))}
                onSearch={(text) => handleEditName(text)}
                placeholder="Введите наименование"
                // value={dataName}
            /> */}

            <Space>
                <Col>
                    {dataName === null ? (
                        <Typography.Text italic type="warning">
                            Добавьте наименование
                        </Typography.Text>
                    ) : (
                        <Typography.Text>{dataName.name}</Typography.Text>
                    )}
                </Col>
                <Col>
                    <Button disabled={disabled} onClick={handleViewModal}>
                        <SettingOutlined />
                    </Button>
                </Col>
            </Space>
        </Row>
    );
};

export default CellName;
