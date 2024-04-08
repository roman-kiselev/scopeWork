import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const MainProvidersPage = () => {
    return (
        <Row
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Row>
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
                                title: "Главная (Заказы)",
                            },
                        ]}
                    />
                </Row>
            </Row>

            <Row>
                <Col>
                    <Card
                        size="small"
                        title="Создать список"
                        extra={<Link to="create">Перейти</Link>}
                        style={{ width: 300 }}
                    >
                        <p>Создание поставщика</p>
                    </Card>
                </Col>
                <Col>
                    <Card
                        size="small"
                        title="Общий список"
                        extra={<Link to="list">Перейти</Link>}
                        style={{ width: 300 }}
                    >
                        <p>Список</p>
                    </Card>
                </Col>
            </Row>
        </Row>
    );
};

export default MainProvidersPage;
