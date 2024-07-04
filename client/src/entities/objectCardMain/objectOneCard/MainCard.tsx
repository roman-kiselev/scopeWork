import { Col, Spin } from "antd";
import { scopeWorkApi } from "../../../shared/api";
import { useAppSelector } from "../../../shared/hooks";
import UniqueCard from "./UniqueCard";
import SelectedTypeWork from "./tabsCard/SelectedTypeWork";

const tabList = [
    {
        key: "Главная",
        tab: "Главная",
        children: <h3>Главная</h3>,
    },
    {
        key: "АСКУЭ",
        tab: "АСКУЭ",
        children: <SelectedTypeWork tabName="АСКУЭ" />,
    },
    {
        key: "Водоснабжение",
        tab: "Водоснабжение",
        children: <SelectedTypeWork tabName="Водоснабжение" />,
    },
    {
        key: "Канализация",
        tab: "Канализация",
        children: <SelectedTypeWork tabName="Канализация" />,
    },
    {
        key: "Отопление",
        tab: "Отопление",
        children: <SelectedTypeWork tabName="Отопление" />,
    },
    {
        key: "Другое",
        tab: "Другое",
        children: <SelectedTypeWork tabName="Другое" />,
    },
];

// const contentList: Record<string, React.ReactNode> = {
//     main: (
//         <div>
//             <ul>
//                 <li>Общий прогресс</li>
//                 <Progress type="circle" percent={75} />
//                 <li>Количество наименований: 380 шт</li>
//                 Принимают участие
//                 <ul>
//                     <li>Иванов А.Н.</li>
//                     <li>Сидоров А.Н.</li>
//                     <li>Петров А.Н.</li>
//                     <li>Щёткин А.Н.</li>
//                 </ul>
//             </ul>
//             <Button type="link">К системе</Button>
//         </div>
//     ),
//     askue: (
//         <div>
//             <ul>
//                 <li>Общий прогресс</li>
//                 <Progress type="circle" percent={25} />
//                 <li>Количество наименований: 380 шт</li>
//                 Принимают участие
//                 <ul>
//                     <li>Иванов А.Н.</li>
//                     <li>Сидоров А.Н.</li>
//                     <li>Петров А.Н.</li>
//                     <li>Щёткин А.Н.</li>
//                 </ul>
//             </ul>
//             <Button type="link">К системе</Button>
//         </div>
//     ),
//     tab2: <p>content2</p>,
// };

const MainCard = () => {
    // Получаем id пользователя для получения ScopeWork
    const { id } = useAppSelector((store) => store.auth);
    if (id) {
        const { isLoading } = scopeWorkApi.useGetAllScopeWorkByUserIdQuery({
            id: id,
        });
        if (isLoading) <Spin />;
    }
    const { objects } = useAppSelector((store) => store.dataOneUser);

    // const [collapsed, setCollapsed] = useState(false);

    // const [activeTabKey1, setActiveTabKey1] = useState<string>("main");
    // const onTab1Change = (key: string) => {
    //     setActiveTabKey1(key);
    // };
    // const toggleMenu = () => {
    //     setCollapsed(!collapsed);
    // };

    return (
        <Col xs={24} sm={24} md={24} lg={15} xl={10}>
            {objects?.map((object) => (
                <UniqueCard key={object.id} object={object} tabList={tabList} />
            ))}
        </Col>
    );
};

export default MainCard;
