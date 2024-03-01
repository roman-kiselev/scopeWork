import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Row } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { Link } from "react-router-dom";
import { CreateStorage } from "src/shared/ui";

const CreateStoragePage = () => {
    const [form] = useForm();
    const data = useWatch([], form);

    const onFinish = () => {
        console.log(data);
    };
    return (
        <Row>
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
                                        <Link to="/storage">
                                            Главная (Склад)
                                        </Link>
                                    </>
                                ),
                            },
                            {
                                title: "Создание (Склад)",
                            },
                        ]}
                    />
                </Row>
            </Col>
            <Row>
                <CreateStorage form={form} onFinish={onFinish} />
            </Row>
        </Row>
    );
};

export default CreateStoragePage;
