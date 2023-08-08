import { Menu, MenuProps } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { getItem, RoleString } from "../../shared/config";
import {
    HomeOutlined,
    BuildOutlined,
    UserAddOutlined,
    UnorderedListOutlined,
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
                    getItem("Option 9", "9", [RoleString.ADMIN], rolesState),
                    getItem("Option 10", "10", [RoleString.ADMIN], rolesState),
                    getItem("Option 11", "11", [RoleString.ADMIN], rolesState),
                    getItem("Option 12", "12", [RoleString.ADMIN], rolesState),
                ]),
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
