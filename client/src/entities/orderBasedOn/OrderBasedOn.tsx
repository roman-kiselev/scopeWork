import { Card, Col } from "antd";

const OrderBasedOn = () => {
    return (
        <Col
            style={{ margin: 10, width: "100%" }}
            sm={24}
            md={24}
            lg={11}
            xl={11}
            xxl={11}
        >
            <Card
                title="Заказ на основании"
                bordered={false}
                style={{ width: "100%" }}
            >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </Col>
    );
};

export default OrderBasedOn;
