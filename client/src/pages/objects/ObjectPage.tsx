import { Layout, Row } from "antd";
import { MainCard } from "../../entities";

const { Header, Sider, Content, Footer } = Layout;

const ObjectPage = () => {
    return (
        <Row>
            <Row style={{ margin: 10, flexDirection: "column" }}>
                <h1>Доступные объекты</h1>
            </Row>
            <Row>
                <MainCard />
            </Row>
        </Row>
    );
};

export default ObjectPage;
