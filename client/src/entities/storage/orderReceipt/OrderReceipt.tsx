import { Button, Col, Divider, Row, Select, Space, Spin } from "antd";
import { storageApi } from "src/shared/api";
import FormTableName from "../form/FormTableName";

const OrderReceipt = () => {
    const { data: listStorage, isLoading: isLoadingStorage } =
        storageApi.useGetAllShortQuery();
    if (isLoadingStorage) {
        return <Spin />;
    }

    const handleChangeSelect = (value: number) => {
        console.log(value);
    };

    const dataForSelect =
        listStorage && listStorage !== undefined
            ? listStorage.map((item) => {
                  return {
                      value: item.id,
                      label: `${item.name} (${item.address})`,
                  };
              })
            : [];

    return (
        <Row style={{ margin: 10, flexDirection: "column" }}>
            <h3 style={{ margin: 10 }}>Пополнение склада</h3>
            <Row>
                <Space>
                    <Col style={{ width: 300 }}>
                        <Select
                            style={{ width: "100%" }}
                            onChange={handleChangeSelect}
                            options={dataForSelect}
                        />
                    </Col>
                    <Col>
                        <Button type="primary">Сохранить</Button>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            style={{ backgroundColor: "#2bb673" }}
                        >
                            В работу
                        </Button>
                    </Col>
                </Space>
            </Row>
            <Divider />
            <Row>
                <FormTableName />
            </Row>
        </Row>
    );
};

export default OrderReceipt;
