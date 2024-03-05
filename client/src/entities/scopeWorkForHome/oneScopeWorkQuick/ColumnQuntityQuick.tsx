import { Button, Col, Input, Row, Space } from "antd";
import { tableAddingDataApi } from "src/shared/api";
import { useAppSelector } from "src/shared/hooks";
import { IValueForListData } from "src/shared/interfaces";

interface IColumnQuntityQuickProps {
    data: IValueForListData[];
    setDataList: any;
    refetch: any;
    nameWorkId: number;
    listNameWorkId: number;
    nameListId: number;
    scopeWorkId: string;
}

const ColumnQuntityQuick: React.FC<IColumnQuntityQuickProps> = ({
    data,
    setDataList,
    refetch,
    nameWorkId,
    listNameWorkId,
    nameListId,
    scopeWorkId,
}) => {
    const { id: userId } = useAppSelector((store) => store.auth);
    const [setTableAddingData, { data: dataEdit }] =
        tableAddingDataApi.useAddDataMutation();

    const getValue = (id: number, listNameWorkId: number) => {
        const findedValue = data.find(
            (item) =>
                item.idNameWork === id && item.listNameWorkId === listNameWorkId
        );

        return findedValue?.value ?? "";
    };

    const setValue = (
        idNameWork: number,
        listNameWorkId: number,
        e?: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e?.target.value ?? "";
        const updatedList = [...data];
        const index = updatedList.findIndex(
            (item) =>
                item.idNameWork === idNameWork &&
                item.listNameWorkId === listNameWorkId
        );

        if (index !== -1) {
            updatedList[index] = {
                ...updatedList[index],
                value,
            };
        }
        setDataList(updatedList);
    };

    const editData = (
        currentQuntity: number,
        nameWorkId: number,
        nameListId: number,
        scopeWorkId: number,
        userId: number | null,
        listNameWorkId: number
    ) => {
        if (userId !== null) {
            setTableAddingData({
                quntity: currentQuntity,
                nameWorkId,
                nameListId,
                scopeWorkId,
                userId,
            });
        }
        refetch();
        setValue(nameWorkId, listNameWorkId);
    };

    return (
        <>
            <Space>
                <Row>
                    <Col>
                        <Input
                            value={getValue(nameWorkId, listNameWorkId)}
                            onChange={(e) =>
                                setValue(nameWorkId, listNameWorkId, e)
                            }
                        />
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            onClick={() =>
                                editData(
                                    Number(
                                        getValue(nameWorkId, listNameWorkId)
                                    ),
                                    nameWorkId,
                                    nameListId,
                                    Number(scopeWorkId),
                                    userId,
                                    listNameWorkId
                                )
                            }
                            disabled={
                                getValue(nameWorkId, listNameWorkId) === ""
                                    ? true
                                    : false
                            }
                        >
                            Сохранить
                        </Button>
                    </Col>
                </Row>
            </Space>
        </>
    );
};

export default ColumnQuntityQuick;
