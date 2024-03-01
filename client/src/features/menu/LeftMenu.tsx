import {
    AppstoreAddOutlined,
    BankOutlined,
    BuildOutlined,
    ContainerOutlined,
    DeploymentUnitOutlined,
    FileAddOutlined,
    HomeOutlined,
    PlusCircleOutlined,
    ToolOutlined,
    UnorderedListOutlined,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { RoleString, getItem } from "../../shared/config";
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
            <Link to="/orders">Заказы</Link>,
            "orders",
            [RoleString.USER, RoleString.MASTER, RoleString.ADMIN],
            rolesState,
            <AppstoreAddOutlined />
        ),
        { type: "divider" },
        getItem(
            <Link to="/storage">Склад</Link>,
            "storage",
            [RoleString.MANAGER, RoleString.MASTER, RoleString.ADMIN],
            rolesState,
            <BankOutlined />
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
                    "objectsAdmin",
                    [RoleString.ADMIN],
                    rolesState,
                    <BuildOutlined />,
                    [
                        getItem(
                            //"Создать",
                            <Link to="/admin/object/create">
                                Создать объект
                            </Link>,
                            "objectsCreate",
                            [RoleString.ADMIN, RoleString.USER],
                            rolesState,
                            <PlusCircleOutlined />
                        ),
                        getItem(
                            <Link to="/admin/object/list">Списки</Link>,
                            "createList",
                            [RoleString.ADMIN],
                            rolesState,
                            <FileAddOutlined />
                        ),
                        getItem(
                            <Link to="/admin/object/scope">Объёмы</Link>,
                            "createScope",
                            [RoleString.ADMIN],
                            rolesState,
                            <AppstoreAddOutlined />
                        ),

                        getItem(
                            <Link to="/admin/object">Статистика</Link>,
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
                        // getItem(
                        //     <Link to="/admin/nomenclature/othersOperation">
                        //         Доп. операции
                        //     </Link>,
                        //     "othersOperation",
                        //     [RoleString.ADMIN],
                        //     rolesState,
                        //     <ToolOutlined />
                        // ),
                    ]
                ),
                getItem(
                    <Link to="/admin/logList">Лог лист</Link>,
                    "logList",
                    [RoleString.ADMIN],
                    rolesState,
                    <UnorderedListOutlined />
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
