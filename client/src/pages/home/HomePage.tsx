import React, { useState } from "react";
import { Button, Card, Col, Progress, Row } from "antd";

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
                <Row>
                    <Col style={{ padding: 10 }}>
                        <h6>Мой прогресс</h6>
                        <Progress type="circle" percent={30} size={80} />
                    </Col>
                    <Col style={{ padding: 10 }}>
                        <h6>Общий прогресс</h6>
                        <Progress type="circle" percent={30} size={80} />
                    </Col>
                </Row>
                <li>Количество работ: 100 шт</li>
                Последние изменения
                <ul>
                    <li>Установка крана - 10 шт</li>
                    <li>Установка Радиаторов - 10 шт</li>
                    <li>Прокладка провода КСВВнг - 50 м</li>
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

const HomePage = () => {
    const [activeTabKey1, setActiveTabKey1] = useState<string>("main");
    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
    };
    return (
        <Row>
            <Row style={{ margin: 10 }}>
                <h1>Мой вклад</h1>
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
                        extra={<a href="#">Подробнее</a>}
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

export default HomePage;
