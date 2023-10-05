import { Button, Col, Progress } from "antd";
import { useState } from "react";
import { scopeWorkApi } from "../../../shared/api";
import { useAppSelector } from "../../../shared/hooks";
import UniqueCard from "./UniqueCard";

const tabList = [
    {
        key: "home",
        tab: "Главная",
        children: <h3>Главная</h3>,
    },
    {
        key: "askue",
        tab: "АСКУЭ",
        children: <h3>АСКУЭ</h3>,
    },
    {
        key: "water",
        tab: "Водоснабжение",
        children: <h3>Водоснабжение</h3>,
    },
    {
        key: "sewerage",
        tab: "Канализация",
        children: <h3>Канализация</h3>,
    },
    {
        key: "heating",
        tab: "Отопление",
        children: <h3>Отопление</h3>,
    },
    {
        key: "other",
        tab: "Другое",
        children: <h3>Отопление</h3>,
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

const MainCard = () => {
    // Получаем id пользователя для получения ScopeWork
    const { id, banned } = useAppSelector((store) => store.auth);
    if (id) {
        const { data } = scopeWorkApi.useGetAllScopeWorkByUserIdQuery({
            id: id,
        });
        console.log(data);
    }
    const { objects } = useAppSelector((store) => store.dataOneUser);

    const [collapsed, setCollapsed] = useState(false);

    const [activeTabKey1, setActiveTabKey1] = useState<string>("main");
    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
    };
    const toggleMenu = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Col xs={24} sm={24} md={24} lg={15} xl={10}>
            {objects?.map((object) => (
                <UniqueCard key={object.id} object={object} tabList={tabList} />
            ))}
        </Col>
    );
};

export default MainCard;
