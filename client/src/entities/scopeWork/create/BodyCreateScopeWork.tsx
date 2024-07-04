import { Divider, Layout, Tabs, TabsProps } from "antd";
import { Content } from "antd/es/layout/layout";
import ShortListNameWorks from "./ShortListNameWorks";
import TableSelectedListNameWork from "./TableSelectedListNameWork";

const BodyCreateScopeWork = () => {
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Основное",
            children: <TableSelectedListNameWork />,
        },
        // {
        //     key: "2",
        //     label: "Список наименований",
        //     children: <h3>Список наименований</h3>,
        // },
        // {
        //     key: "3",
        //     label: "Дополнительно",
        //     children: "Здесь могут быть разлицные операции",
        // },
    ];

    return (
        <Layout>
            <Content style={{ display: "flex" }}>
                <div style={{ flex: 1, flexBasis: "60%", marginTop: 10 }}>
                    <h1>Собрать список</h1>
                    <Tabs defaultActiveKey="1" items={items} />
                    {/* <div style={{ overflow: "auto", height: "90vh" }}></div> */}
                </div>
                <Divider type="vertical" style={{ height: "80vh" }} />
                {/* <div style={{ flex: 1 }}></div> */}
                <div
                    style={{
                        flex: 1,
                        flexBasis: "40%",
                        overflow: "auto",
                        marginTop: 10,
                    }}
                >
                    {/* Content for right window */}
                    <h1>Список наименований работ</h1>

                    <ShortListNameWorks />
                </div>
            </Content>
        </Layout>
    );
};

export default BodyCreateScopeWork;
