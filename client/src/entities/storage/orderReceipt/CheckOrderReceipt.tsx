import { CheckOutlined, ExclamationOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Select, Space, Spin } from "antd";
import { useParams } from "react-router";
import { orderReceiptApi, storageApi } from "src/shared/api";
import { useAppSelector } from "src/shared/hooks";
import FormTableNameCheck from "../form/FormTableNameCheck";

interface ICheckOrderReceiptProps {
    id: string;
}

const CheckOrderReceipt = () => {
    const { id } = useParams();

    const { data: listStorage, isLoading: isLoadingStorage } =
        storageApi.useGetAllShortQuery();
    const { data: order, isLoading: isLoadingOrder } =
        orderReceiptApi.useGetOneOrderReceiptQuery(id ?? "0");
    const { numberOrder } = useAppSelector(
        (store) => store.orders.orderReceipt
    );

    if (isLoadingStorage || isLoadingOrder) {
        return <Spin />;
    }
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
            <h3 style={{ margin: 10 }}>{`Заказ №${numberOrder}`}</h3>
            <Row>
                <Space>
                    <Col style={{ width: 300 }}>
                        <Select
                            disabled={true}
                            defaultValue={order?.storage?.id ?? 0}
                            style={{ width: "100%" }}
                            //onChange={handleChangeSelect}
                            options={dataForSelect}
                        />
                    </Col>
                </Space>
            </Row>
            <Divider />
            <Row
                style={{
                    border: "1px solid grey",
                    padding: "7px",
                    borderRadius: "10px",
                    width: "max-content",
                }}
            >
                <Space>
                    <Button
                        disabled={true}
                        style={{ backgroundColor: "#009900", color: "white" }}
                        size="small"
                        onClick={() => {}}
                    >
                        <CheckOutlined /> - Принять
                    </Button>
                    <Button
                        disabled={true}
                        style={{ backgroundColor: "#FFFF00", color: "black" }}
                        size="small"
                        onClick={() => {}}
                    >
                        <ExclamationOutlined /> - Принять частично
                    </Button>
                    {/* <Button
                        disabled={true}
                        style={{ backgroundColor: "#FF3300", color: "white" }}
                        size="small"
                        onClick={() => {}}
                    >
                        <CloseOutlined /> - Не принимать
                    </Button> */}
                </Space>
            </Row>
            <Divider />
            <Row>
                <FormTableNameCheck />
            </Row>
        </Row>
    );
};

export default CheckOrderReceipt;
