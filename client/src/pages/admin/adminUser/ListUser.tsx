import { Card, Col, Divider, Progress, Row, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import { typeWorkApi, userApi } from "../../../shared/api";
import { IUser } from "../../../shared/interfaces";

interface INewUser {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
}

const getDataItem = (data: IUser[]) => {
    const newData = data.map((user, index) => {
        const { userDescription } = user;
        const { firstname, lastname } = userDescription;
        return {
            id: user.id,
            name: user.email,
            firstname: firstname,
            lastname: lastname,
        } as INewUser;
    });
    return newData;
};

const ListUser = () => {
    // const { data, isSuccess } = userApi.useGetAllUsersQuery();

    // const dataUser: INewUser[] = getDataItem(data || []);
    const { data: dataTypeWork, isSuccess: isSuccessTypeWork } =
        typeWorkApi.useGetAllShortQuery();
    const { data, isSuccess, isLoading } =
        userApi.useGetAllUsersWithDataQuery();
    if (isLoading) {
        return <Spin />;
    }

    const getNameTypeWork = (idTypeWork: number) => {
        if (dataTypeWork) {
            const typeWork = dataTypeWork.find(
                (item) => item.id === idTypeWork
            );
            return typeWork?.name;
        }
    };

    return (
        <>
            {isSuccess && (
                <>
                    {data.map((user, index) => (
                        <Card
                            key={user.id}
                            style={{ marginTop: 16 }}
                            type="inner"
                            title={`${index + 1}. ${user.firstName} ${
                                user.lastName
                            }.`}
                            extra={<Link to={`${user.id}`}>Подробнее</Link>}
                        >
                            <Row>
                                <Space>
                                    <Col>
                                        Объекты:
                                        {user.objects.map((object, index) => (
                                            <li
                                                key={`${object.id}${user.scopeWorkPlusData[index].id}`}
                                                style={{ margin: "9px 0" }}
                                            >
                                                {index + 1}. {object.name}
                                            </li>
                                        ))}
                                    </Col>
                                    <Divider type="vertical" />
                                    <Col>
                                        Объёмы:
                                        {user.scopeWorkPlusData.map(
                                            (scopeWork, index) => (
                                                <li
                                                    style={{ margin: "9px 0" }}
                                                    key={scopeWork.id}
                                                >
                                                    {index + 1}. Объём №
                                                    {scopeWork.id}(
                                                    {getNameTypeWork(
                                                        scopeWork.typeWorkId
                                                    )}
                                                    )
                                                </li>
                                            )
                                        )}
                                    </Col>
                                    <Divider type="vertical" />
                                    <Col>
                                        Общий процент:
                                        {user.scopeWorkPlusData.map(
                                            (scopeWork, index) => (
                                                <Progress
                                                    key={`${scopeWork.id}`}
                                                    percent={Number(
                                                        scopeWork.percentAll
                                                    )}
                                                    size="small"
                                                />
                                            )
                                        )}
                                    </Col>

                                    <Col>
                                        Процент участия:
                                        {user.scopeWorkPlusData.map(
                                            (scopeWork, index) => (
                                                <Progress
                                                    key={`${scopeWork.id}`}
                                                    percent={Number(
                                                        scopeWork.percentOneUserForTotalVolume
                                                    )}
                                                    size="small"
                                                />
                                            )
                                        )}
                                    </Col>
                                </Space>
                            </Row>
                        </Card>
                    ))}
                </>
            )}
        </>
    );
};

export default ListUser;
