import {
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, MenuProps } from "antd";
import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authApi } from "src/shared/api";
import { LeftMenu } from "../../features";
import { useAppSelector } from "../../shared/hooks";
const { Header, Sider, Content, Footer } = Layout;

const LayoutPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { email, isAuth, token } = useAppSelector((store) => store.auth);
    const [logout] = authApi.useLogoutMutation();
    const handleClickLogout = () => {
        logout();
    };

    if (!isAuth || !token) {
        return <Navigate to="/welcome" />;
    }

    const toggleMenu = () => {
        setCollapsed(!collapsed);
    };
    const width = window.innerWidth;

    const items: MenuProps["items"] = [
        {
            type: "divider",
        },
        {
            label: <Button onClick={handleClickLogout}>Выход</Button>,
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
                    minHeight: "100vh",
                    height: "100%",
                }}
            >
                <div style={{ margin: "10px" }}>
                    <div style={{ fontSize: 20, paddingTop: 10 }}>
                        <a style={{ textDecoration: "none", color: "black" }}>
                            LOGO
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
                                {email} <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    className="site-layout-content"
                    style={{
                        margin: "5px",
                        // padding: 24,
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
                    <p>
                        <a href="mailto:snab.pto@yandex.ru">
                            "Задавайте вопросы по электронной почте"
                        </a>
                    </p>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutPage;
