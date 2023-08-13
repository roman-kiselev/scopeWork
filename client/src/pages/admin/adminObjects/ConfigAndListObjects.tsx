import React, {useState} from "react";
import {Button, Card, Col, Progress, Row} from "antd";
import {Link} from "react-router-dom";


const contentList: Record<string, React.ReactNode> = {
    main: (
        <div>
            <ul>
                <li>Общий прогресс</li>
                <Progress type="circle" percent={75}/>
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
                <Progress type="circle" percent={25}/>
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
        <Row style={{margin: 10, flexDirection: "column", flexBasis: "100%"}}>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h1>Конфигурирование объектов</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Card

                        title="ЖК 'Зеландия'"
                        extra={<Link to={`/admin/object/1`}>
                            К объекту
                        </Link>}

                        style={{margin: 10}}
                    >
                        {contentList[activeTabKey1]}
                    </Card>
                </Col>
                {/*<Col xs={24} sm={24} md={24} lg={15} xl={10}>
                    <Card
                        // type={"inner"}
                        title="ЖК 'Зеландия'"
                        extra={<a href="#">More</a>}
                        tabList={tabList}
                        activeTabKey={activeTabKey1}
                        onTabChange={onTab1Change}
                        style={{margin: 10}}
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
                        style={{margin: 10}}
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
                        style={{margin: 10}}
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
                        style={{margin: 10}}
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
                        style={{margin: 10}}
                    >
                        {contentList[activeTabKey1]}
                    </Card>
                </Col>*/}
            </Row>
        </Row>
    );
};

export default ConfigAndListObjects;
