import { Menu, MenuProps } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { getItem, RoleString } from "../../shared/config";
import {
    HomeOutlined,
    BuildOutlined,
    UserAddOutlined,
    UnorderedListOutlined,
    ContainerOutlined,
    PlusCircleOutlined,
    DeploymentUnitOutlined,
    AppstoreAddOutlined,
    FileAddOutlined,
    ToolOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../shared/hooks";
const LeftMenu = () => {
    // Получаем роли из state
    const { roles: rolesState } = useAppSelector((state) => state.auth);

    const itemsNav: MenuProps["items"] = [
        getItem(
            <Link to="/">Домашняя</Link>,
            "home",
            [RoleString.USER, RoleString.ADMIN],
            rolesState,
            <HomeOutlined />
        ),
        getItem(
            <Link to="/objects">Объекты</Link>,
            "objects",
            [RoleString.USER, RoleString.ADMIN],
            rolesState,
            <BuildOutlined />
        ),

        { type: "divider" },
        getItem(
            "Администрирование",
            "admin",
            [RoleString.ADMIN],
            rolesState,
            null,
            [
                getItem(
                    "Пользователи",
                    "users",
                    [RoleString.ADMIN],
                    rolesState,
                    null,
                    [
                        getItem(
                            "Создать",
                            "create",
                            [RoleString.ADMIN],
                            rolesState,
                            <UserAddOutlined />
                        ),
                        getItem(
                            "Лист пользователей",
                            "list",
                            [RoleString.ADMIN],
                            rolesState,
                            <UnorderedListOutlined />
                        ),
                    ]
                ),
                getItem("Объекты", "13", [RoleString.ADMIN], rolesState, null, [
                    getItem(
                        "Создать",
                        "9",
                        [RoleString.ADMIN],
                        rolesState,
                        <PlusCircleOutlined />
                    ),
                    getItem(
                        "Создать объём",
                        "10",
                        [RoleString.ADMIN],
                        rolesState,
                        <AppstoreAddOutlined />
                    ),
                    getItem(
                        "Создать вид работ",
                        "11",
                        [RoleString.ADMIN],
                        rolesState,
                        <FileAddOutlined />
                    ),
                    getItem(
                        "Конфигурирование",
                        "12",
                        [RoleString.ADMIN],
                        rolesState,
                        <ToolOutlined />
                    ),
                ]),
                getItem(
                    "Номенклатура",
                    "тomenclature",
                    [RoleString.ADMIN],
                    rolesState,
                    <ContainerOutlined />,
                    [
                        getItem(
                            "Добавить",
                            "9",
                            [RoleString.ADMIN],
                            rolesState,
                            <PlusCircleOutlined />
                        ),
                        getItem(
                            "Каталог",
                            "10",
                            [RoleString.ADMIN],
                            rolesState,
                            <UnorderedListOutlined />
                        ),
                        getItem(
                            "Ед.измерения",
                            "11",
                            [RoleString.ADMIN],
                            rolesState,
                            <DeploymentUnitOutlined />
                        ),
                        getItem(
                            "Доп. операции",
                            "12",
                            [RoleString.ADMIN],
                            rolesState,
                            <ToolOutlined />
                        ),
                    ]
                ),
            ],
            "group"
        ),
    ];

    return (
        <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={itemsNav}
        />
    );
};

export default LeftMenu;
