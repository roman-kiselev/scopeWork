import React from "react";
import { Row, Col } from "antd";
import { Layout } from "antd";
const { Content } = Layout;

interface LayoutAuthProps {
    children: React.ReactNode;
}

const LayoutAuth: React.FC<LayoutAuthProps> = ({ children }) => {
    return (
        // <div
        //     style={{
        //         minHeight: "100vh",
        //         display: "flex",
        //         alignItems: "center",
        //         justifyContent: "center",
        //     }}
        // >
        //     <Row>
        //         <Col span={20}>{children}</Col>
        //     </Row>
        // </div>

        <Layout>
            <Content>
                <Row
                    align="middle"
                    justify="center"
                    style={{ minHeight: "100vh" }}
                >
                    <Col xs={24} sm={12} md={8} lg={6}>
                        {children}
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default LayoutAuth;
