import { Button, Col, Divider, List, Row, Space } from "antd";
import { EmptyModal } from "src/shared/ui";

const HeaderCreateInvite = () => {
    const handleClose = () => {
        console.log("close");
    };

    return (
        <Row>
            <EmptyModal
                handleCancel={handleClose}
                open={true}
                title="Создание приглашения"
            >
                <p>Hello</p>
            </EmptyModal>
            <Space>
                <Col span={24}>
                    <h2>Список</h2>
                </Col>
                <Col span={24}>
                    <Button size="small" type="primary">
                        +
                    </Button>
                </Col>
            </Space>
        </Row>
    );
};

const UserInvitePage = () => {
    return (
        <List
            size="small"
            header={<HeaderCreateInvite />}
            //footer={<div>Footer</div>}
            bordered
            // dataSource={data}
            // renderItem={(item) => <List.Item>{item}</List.Item>}
        >
            <List.Item>
                <Row>
                    <Space>
                        <Col>1.</Col>
                        <Col>
                            Email: <a>email@email.ru</a>
                        </Col>
                        <Divider type="vertical" />
                        <Col>
                            Статус: <a>В ожидании</a>
                        </Col>
                        <Divider type="vertical" />
                        <Col>
                            <Button size="small" type="primary">
                                Отправить повторно
                            </Button>
                        </Col>
                        <Divider type="vertical" />
                    </Space>
                </Row>
            </List.Item>
        </List>
    );
};

export default UserInvitePage;
