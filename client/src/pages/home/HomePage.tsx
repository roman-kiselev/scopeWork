import React, { useState } from "react";
import { Button, Dropdown, Layout, Menu } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    AppstoreOutlined,
    SettingOutlined,
    DownOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content } = Layout;

const HomePage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleMenu = () => {
        setCollapsed(!collapsed);
    };

    const menuItems = [
        { key: "1", label: "Profile" },
        { key: "2", label: "Settings" },
        { key: "3", label: "Logout" },
    ];

    const menu = (
        <Menu>
            {menuItems.map((item) => (
                <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
        </Menu>
    );
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                collapsedWidth={0}
                width={200}
                theme="light"
            >
                <div className="logo" />
                <Menu mode="inline" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<AppstoreOutlined />}>
                        Products
                    </Menu.Item>
                    <Menu.Item key="3" icon={<SettingOutlined />}>
                        Settings
                    </Menu.Item>
                </Menu>
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
                            menu={menu}
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
                <Content className="site-layout-content">
                    <h1>Dashboard Page</h1>
                </Content>
            </Layout>
        </Layout>
    );
};

export default HomePage;
