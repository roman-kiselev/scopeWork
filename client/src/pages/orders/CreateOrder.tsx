import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { OrderBasedOn, SimpleOrder } from "src/entities";

const CreateOrder = () => {
    return (
        <Row
            style={{
                display: "flex",
                width: "100%",
            }}
        >
            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Row
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Breadcrumb
                        items={[
                            {
                                title: (
                                    <>
                                        <HomeOutlined />
                                        <Link to="/">Домой</Link>
                                    </>
                                ),
                            },
                            {
                                title: (
                                    <>
                                        <Link to="/orders">
                                            Главная (Заказы)
                                        </Link>
                                    </>
                                ),
                            },
                            {
                                title: "Создать заказ",
                            },
                        ]}
                    />
                </Row>
            </Col>
            <Row style={{ width: "100%" }}>
                <SimpleOrder />
                <OrderBasedOn />
            </Row>
        </Row>
    );
};

export default CreateOrder;
