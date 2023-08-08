import React, { useState } from "react";
import {
    Button,
    Card,
    Col,
    Dropdown,
    Layout,
    Menu,
    MenuProps,
    Row,
    Space,
} from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { getItem } from "../../shared/config";
import { LeftMenu } from "../../features";
import { setMaxIdleHTTPParsers } from "http";
const { Header, Sider, Content, Footer } = Layout;

const tabList = [
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
    askue: (
        <div>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
        </div>
    ),
    tab2: <p>content2</p>,
};

const LayoutPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const [activeTabKey1, setActiveTabKey1] = useState<string>("tab1");
    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
    };
    const toggleMenu = () => {
        setCollapsed(!collapsed);
    };
    const width = window.innerWidth;

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
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                collapsedWidth={0}
                width={230}
                theme="light"
                style={{
                    height: "100vh",
                }}
            >
                <div style={{ margin: "10px" }}>
                    <div style={{ fontSize: 20, paddingTop: 10 }}>
                        <a style={{ textDecoration: "none", color: "black" }}>
                            ООО "ГК КРОН"
                        </a>
                    </div>
                </div>
                <LeftMenu />
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
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        display: !collapsed && width < 500 ? "none" : "block",
                    }}
                >
                    <Outlet />
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                        display: !collapsed && width < 500 ? "none" : "flex",
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutPage;