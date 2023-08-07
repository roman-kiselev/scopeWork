import React, { useState } from "react";
import { Button, Dropdown, Layout, Menu, MenuProps } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    AppstoreOutlined,
    SettingOutlined,
    DownOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MailOutlined,
    HomeOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content, Footer } = Layout;

const HomePage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleMenu = () => {
        setCollapsed(!collapsed);
    };

    type MenuItem = Required<MenuProps>["items"][number];

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: "group"
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }

    const itemsNav: MenuProps["items"] = [
        getItem("Главная", "home", <HomeOutlined />),
        getItem("Navigation One", "sub1", <MailOutlined />, [
            getItem(
                "Item 1",
                "g1",
                null,
                [getItem("Option 1", "1"), getItem("Option 2", "2")],
                "group"
            ),
            getItem(
                "Item 2",
                "g2",
                null,
                [getItem("Option 3", "3"), getItem("Option 4", "4")],
                "group"
            ),
        ]),

        getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
            getItem("Option 5", "5"),
            getItem("Option 6", "6"),
            getItem("Submenu", "sub3", null, [
                getItem("Option 7", "7"),
                getItem("Option 8", "8"),
            ]),
        ]),

        { type: "divider" },

        getItem("Navigation Three", "sub4", <SettingOutlined />, [
            getItem("Option 9", "9"),
            getItem("Option 10", "10"),
            getItem("Option 11", "11"),
            getItem("Option 12", "12"),
        ]),

        getItem(
            "Group",
            "grp",
            null,
            [getItem("Option 13", "13"), getItem("Option 14", "14")],
            "group"
        ),
    ];

    const items: MenuProps["items"] = [
        {
            label: <a href="https://www.antgroup.com">1st menu item</a>,
            key: "0",
        },
        {
            label: <a href="https://www.aliyun.com">2nd menu item</a>,
            key: "1",
        },
        {
            type: "divider",
        },
        {
            label: "3rd menu item",
            key: "3",
        },
    ];

    return (
        <Layout
            style={{
                overflow: "auto",
                minHeight: "100vh",
                // position: "fixed",
                // left: 0,
                // top: 0,
                // bottom: 0,
            }}
        >
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                collapsedWidth={0}
                width={200}
                theme="light"
            >
                <div className="logo" />

                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={["4"]}
                    items={itemsNav}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-header"
                    style={{ padding: 0, background: "#fff" }}
                >
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: toggleMenu,
                        }
                    )}
                    <div style={{ float: "right" }}>
                        <Dropdown
                            menu={{ items }}
                            placement="bottomRight"
                            trigger={["click"]}
                        >
                            <Button
                                type="text"
                                className="ant-dropdown-link"
                                onClick={(e) => e.preventDefault()}
                            >
                                Username <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    className="site-layout-content"
                    style={{ margin: "24px 16px 0", overflow: "initial" }}
                >
                    <h1>Dashboard Page</h1>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default HomePage;
