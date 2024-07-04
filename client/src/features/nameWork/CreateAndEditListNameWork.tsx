import { Divider, Layout, Tabs, TabsProps } from "antd";
import { Content } from "antd/es/layout/layout";
import {
    ListForAddNameWork,
    MainNameWork,
    ShortListNamesWithoutTypes,
} from "../../entities";

const CreateAndEditListNameWork = () => {
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Основное",
            children: <MainNameWork />,
        },
        {
            key: "2",
            label: "Список",
            children: <ListForAddNameWork />,
        },
        // {
        //     key: "3",
        //     label: "Дополнительно",
        //     children: "Здесь могут быть разлицные операции",
        // },
    ];

    return (
        <Layout>
            <Content style={{ display: "flex" }}>
                <div style={{ flex: 1, flexBasis: "70%" }}>
                    <h1>Собрать список</h1>
                    <Tabs defaultActiveKey="1" items={items} />
                    {/* <div style={{ overflow: "auto", height: "90vh" }}></div> */}
                </div>
                <Divider type="vertical" style={{ height: "80vh" }} />
                <div style={{ flex: 1 }}></div>
                <div style={{ flex: 1, flexBasis: "30%", overflow: "auto" }}>
                    {/* Content for right window */}
                    <h1>Список наименований работ</h1>
                    <ShortListNamesWithoutTypes />
                </div>
            </Content>
        </Layout>
    );
};

export default CreateAndEditListNameWork;
