import { Button, Divider, Input, Row, Table, TableProps } from "antd";
import { useState } from "react";
import { nameWorkApi } from "src/shared/api";
import { useAppDispatch } from "src/shared/hooks";
import { INameWork, INameWorkShort } from "src/shared/interfaces";
import { editRow } from "src/shared/models";

interface IModalFindNameProps {
    cellKey: string;
    handleCancel: () => void;
}

interface INameWorkForTable extends INameWork {
    key: string;
}

const ModalFindName: React.FC<IModalFindNameProps> = ({
    cellKey,
    handleCancel,
}) => {
    const dispatch = useAppDispatch();
    //const { data } = useAppSelector((store) => store.orders.orderReceipt);
    const [nameState, setNameString] = useState<string>("");
    const [dataForTable, setData] = useState<INameWorkForTable[]>([]);
    const { data: dataText } = nameWorkApi.useFindNameWorkQuery(
        { text: nameState },
        { refetchOnMountOrArgChange: true }
    );

    const handleEditName = (text: string) => {
        setNameString(text);
        if (dataText) {
            const newDataText = dataText.map((item) => {
                return { ...item, key: item.id.toString() };
            });
            setData(newDataText);
        }
    };

    const handleClick = (data: INameWorkForTable) => {
        const dataName: INameWorkShort = {
            id: data.id,
            name: data.name,
        };
        dispatch(editRow({ key: cellKey, nameField: "name", value: dataName }));
        handleCancel();
    };

    const columns: TableProps<INameWorkForTable>["columns"] = [
        {
            title: "Наименование",
            dataIndex: "name",
            key: "name",
            render: (_, { name }) => name,
        },
        {
            title: "Действие",
            dataIndex: "action",
            key: "action",
            render: (_, render) => (
                <Button onClick={() => handleClick(render)}>Выбор</Button>
            ),
        },
    ];

    return (
        <Row style={{ width: "100%" }}>
            <Divider />
            <Input
                style={{ width: "100%" }}
                allowClear
                placeholder="Поиск по наименованию"
                value={nameState}
                onChange={(e) => handleEditName(e.target.value)}
            />
            <Divider />
            <Table dataSource={dataForTable} columns={columns} />
        </Row>
    );
};

export default ModalFindName;
