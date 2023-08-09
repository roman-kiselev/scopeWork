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
    UserOutlined,
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
                    <UserOutlined />,
                    [
                        getItem(
                            <Link to="/admin/users/create">Создать</Link>,
                            "usersCreate",
                            [RoleString.ADMIN],
                            rolesState,
                            <UserAddOutlined />
                        ),
                        getItem(
                            <Link to="/admin/users">Лист пользователей</Link>,

                            "usersList",
                            [RoleString.ADMIN],
                            rolesState,
                            <UnorderedListOutlined />
                        ),
                    ]
                ),
                getItem(
                    "Объекты",
                    "adminObjects",
                    [RoleString.ADMIN],
                    rolesState,
                    <BuildOutlined />,
                    [
                        getItem(
                            //"Создать",
                            <Link to="/admin/object/create">Создать</Link>,
                            "objectsCreate",
                            [RoleString.ADMIN, RoleString.USER],
                            rolesState,
                            <PlusCircleOutlined />
                        ),
                        getItem(
                            <Link to="/admin/object/scope">Создать объём</Link>,
                            "createScope",
                            [RoleString.ADMIN],
                            rolesState,
                            <AppstoreAddOutlined />
                        ),
                        getItem(
                            <Link to="/admin/object">Конфигурирование</Link>,
                            "configuration",
                            [RoleString.ADMIN],
                            rolesState,
                            <ToolOutlined />
                        ),
                    ]
                ),
                getItem(
                    "Номенклатура",
                    "nomenclature",
                    [RoleString.ADMIN],
                    rolesState,
                    <ContainerOutlined />,
                    [
                        getItem(
                            <Link to="/admin/nomenclature/create">
                                Добавить
                            </Link>,
                            "addNomenclature",
                            [RoleString.ADMIN],
                            rolesState,
                            <PlusCircleOutlined />
                        ),
                        getItem(
                            <Link to="/admin/nomenclature">Каталог</Link>,
                            "catalog",
                            [RoleString.ADMIN],
                            rolesState,
                            <UnorderedListOutlined />
                        ),
                        getItem(
                            <Link to="/admin/nomenclature/unit">
                                Ед.измерения
                            </Link>,
                            "unit",
                            [RoleString.ADMIN],
                            rolesState,
                            <DeploymentUnitOutlined />
                        ),
                        getItem(
                            <Link to="/admin/nomenclature/othersOperation">
                                Доп. операции
                            </Link>,
                            "othersOperation",
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
