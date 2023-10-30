import { Col, Row } from "antd";
import { useState } from "react";
import { ListShortObject } from "../../../entities";

const ConfigAndListObjects = () => {
    const [collapsed, setCollapsed] = useState(false);

    const [activeTabKey1, setActiveTabKey1] = useState<string>("main");
    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
    };
    const toggleMenu = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Row style={{ margin: 10, flexDirection: "column", flexBasis: "100%" }}>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h1>Объекты</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <ListShortObject />
                </Col>
            </Row>
        </Row>
    );
};

export default ConfigAndListObjects;
