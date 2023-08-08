import React, { useState } from "react";
import {
    Button,
    Card,
    Col,
    Dropdown,
    Layout,
    Menu,
    MenuProps,
    Progress,
    Row,
    Space,
} from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getItem } from "../../shared/config";
import { LeftMenu } from "../../features";
import { setMaxIdleHTTPParsers } from "http";
const { Header, Sider, Content, Footer } = Layout;

const tabList = [
    {
        key: "main",
        tab: "Главная",
    },
    {
        key: "askue",
        tab: "АСКУЭ",
    },
    {
        key: "water",
        tab: "Водоснабжение",
    },
    {
        key: "canal",
        tab: "Канализация",
    },
    {
        key: "otopl",
        tab: "Отопление",
    },
    {
        key: "nalad",
        tab: "Наладка",
    },
];

const contentList: Record<string, React.ReactNode> = {
    main: (
        <div>
            <ul>
                <li>Общий прогресс</li>
                <Progress type="circle" percent={75} />
                <li>Количество наименований: 380 шт</li>
                Принимают участие
                <ul>
                    <li>Иванов А.Н.</li>
                    <li>Сидоров А.Н.</li>
                    <li>Петров А.Н.</li>
                    <li>Щёткин А.Н.</li>
                </ul>
            </ul>
            <Button type="link">К системе</Button>
        </div>
    ),
    askue: (
        <div>
            <ul>
                <li>Общий прогресс</li>
                <Progress type="circle" percent={25} />
                <li>Количество наименований: 380 шт</li>
                Принимают участие
                <ul>
                    <li>Иванов А.Н.</li>
                    <li>Сидоров А.Н.</li>
                    <li>Петров А.Н.</li>
                    <li>Щёткин А.Н.</li>
                </ul>
            </ul>
            <Button type="link">К системе</Button>
        </div>
    ),
    tab2: <p>content2</p>,
};
const ObjectPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const [activeTabKey1, setActiveTabKey1] = useState<string>("main");
    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
    };
    const toggleMenu = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Row>
            <Row style={{ margin: 10, flexDirection: "column" }}>
                <h1>Доступные объекты</h1>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={15} xl={10}>
                    <Card
                        // type={"inner"}
                        title="ЖК 'Зеландия'"
                        extra={<a href="#">Подробнее</a>}
                        tabList={tabList}
                        activeTabKey={activeTabKey1}
                        onTabChange={onTab1Change}
                        style={{ margin: 10 }}
                    >
                        {contentList[activeTabKey1]}
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={15} xl={10}>
                    <Card
                        // type={"inner"}
                        title="ЖК 'Зеландия'"
                        extra={<a href="#">More</a>}
                        tabList={tabList}
                        activeTabKey={activeTabKey1}
                        onTabChange={onTab1Change}
                        style={{ margin: 10 }}
                    >
                        {contentList[activeTabKey1]}
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={15} xl={10}>
                    <Card
                        // type={"inner"}
                        title="ЖК 'Зеландия'"
                        extra={<a href="#">More</a>}
                        tabList={tabList}
                        activeTabKey={activeTabKey1}
                        onTabChange={onTab1Change}
                        style={{ margin: 10 }}
                    >
                        {contentList[activeTabKey1]}
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={15} xl={10}>
                    <Card
                        // type={"inner"}
                        title="ЖК 'Зеландия'"
                        extra={<a href="#">More</a>}
                        tabList={tabList}
                        activeTabKey={activeTabKey1}
                        onTabChange={onTab1Change}
                        style={{ margin: 10 }}
                    >
                        {contentList[activeTabKey1]}
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={15} xl={10}>
                    <Card
                        // type={"inner"}
                        title="ЖК 'Зеландия'"
                        extra={<a href="#">More</a>}
                        tabList={tabList}
                        activeTabKey={activeTabKey1}
                        onTabChange={onTab1Change}
                        style={{ margin: 10 }}
                    >
                        {contentList[activeTabKey1]}
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={15} xl={10}>
                    <Card
                        // type={"inner"}
                        title="ЖК 'Зеландия'"
                        extra={<a href="#">More</a>}
                        tabList={tabList}
                        activeTabKey={activeTabKey1}
                        onTabChange={onTab1Change}
                        style={{ margin: 10 }}
                    >
                        {contentList[activeTabKey1]}
                    </Card>
                </Col>
            </Row>
        </Row>
    );
};

export default ObjectPage;
