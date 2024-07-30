import { Col, Layout, Row } from "antd";
import React from "react";
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
                    style={{ height: "100vh" }}
                >
                    <Col>{children}</Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default LayoutAuth;
