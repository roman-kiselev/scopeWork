import { Col, Progress, Row, Spin, Statistic } from "antd";
import { userApi } from "../../../../shared/api";
import { useAppSelector } from "../../../../shared/hooks";
import { IObjectFullData, IUser } from "../../../../shared/interfaces";

interface ObjectInfoProps {
    oneObjectWithFullData: IObjectFullData;
}

const getUserName = (userId: number, data: IUser[]) => {
    const findedUser = data.find((item) => item.id === userId);
    if (findedUser) {
        return (
            findedUser.userDescription.firstname +
            " " +
            findedUser.userDescription.lastname
        );
    }
};

const ObjectInfo: React.FC<ObjectInfoProps> = ({ oneObjectWithFullData }) => {
    const { isLoading: isLoadingUsers, data } = userApi.useGetAllUsersQuery();
    const { listUsers, isLoading: isLoadingStore } = useAppSelector(
        (store) => store.users
    );
    if (isLoadingUsers || isLoadingStore) {
        return <Spin />;
    }

    return (
        <Row
            style={{
                display: "flex",

                flexDirection: "column",
            }}
        >
            <Row
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                }}
            >
                <Col style={{ margin: 10 }}>
                    <Statistic
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        groupSeparator=""
                        title="Количество "
                        value={oneObjectWithFullData.countTableAddingDataObject.toFixed(
                            2
                        )}
                        suffix={`/${oneObjectWithFullData.countListNameWorksObject.toFixed(
                            2
                        )}`}
                    />
                </Col>
                <Col style={{ margin: 10 }}>
                    <Progress
                        type="circle"
                        percent={Number(
                            (
                                (oneObjectWithFullData.countTableAddingDataObject /
                                    oneObjectWithFullData.countListNameWorksObject) *
                                100
                            ).toFixed(2)
                        )}
                    />
                </Col>
            </Row>
            <Row
                style={{
                    display: "flex",
                    justifyContent: "start",
                    margin: 10,
                    border: "1px solid #1677ff",
                    borderRadius: 5,
                    flexDirection: "column",
                }}
            >
                <div style={{ margin: 10 }}>
                    <Row>
                        <span>Пользователи участвующие на объекте</span>
                    </Row>
                    {oneObjectWithFullData.mainListUserNoRepetitions.map(
                        (user) => (
                            <Row style={{ margin: 10 }} key={user.userId}>
                                <label>
                                    {getUserName(user.userId, listUsers)}
                                </label>
                                <Progress
                                    percent={Number(user.percent)}
                                    status="active"
                                />
                            </Row>
                        )
                    )}
                </div>
            </Row>
        </Row>
    );
};

export default ObjectInfo;
