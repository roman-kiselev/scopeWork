import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Row } from "antd";
import { Link } from "react-router-dom";
import { RoleString } from "src/shared/config";
import { useAppSelector } from "src/shared/hooks";
import { CardAccess } from "src/shared/ui";

const MainStoragePage = () => {
    const { roles } = useAppSelector((store) => store.auth);
    const myRoles = roles.map((role) => role.name);

    return (
        <Row
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Row>
                <Row
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Breadcrumb
                        items={[
                            {
                                title: (
                                    <>
                                        <HomeOutlined />
                                        <Link to="/">Домой</Link>
                                    </>
                                ),
                            },

                            {
                                title: "Главная (Склад)",
                            },
                        ]}
                    />
                </Row>
            </Row>

            <Row>
                <CardAccess
                    titleCard="Создать"
                    description="Создание склада"
                    dataRoles={myRoles}
                    accessRoles={[RoleString.ADMIN, RoleString.MANAGER]}
                    links={[
                        {
                            title: "Перейти",
                            to: "create",
                            accessRoles: [RoleString.ADMIN, RoleString.MANAGER],
                        },
                    ]}
                />

                <CardAccess
                    titleCard="Общий список"
                    description="Склады"
                    dataRoles={myRoles}
                    accessRoles={[RoleString.ADMIN, RoleString.MANAGER]}
                    links={[
                        {
                            title: "Перейти",
                            to: "listStorage",
                            accessRoles: [RoleString.ADMIN, RoleString.MANAGER],
                        },
                    ]}
                />
                <CardAccess
                    titleCard="Поступления"
                    description="Добавить на склад"
                    dataRoles={myRoles}
                    accessRoles={[RoleString.ADMIN, RoleString.MANAGER]}
                    links={[
                        {
                            title: "Создать",
                            to: "add-name-in-storage",
                            accessRoles: [RoleString.ADMIN, RoleString.MANAGER],
                        },
                        {
                            title: "Список",
                            to: "list-name-in-storage",
                            accessRoles: [
                                RoleString.ADMIN,
                                RoleString.MANAGER,
                                RoleString.WAREHOUSEMAN,
                            ],
                        },
                    ]}
                />
            </Row>
        </Row>
    );
};

export default MainStoragePage;
