import {
    Button,
    Card,
    Col,
    Collapse,
    Drawer,
    Progress,
    Row,
    Space,
    Spin,
    Statistic,
    Tag,
} from "antd";
import { useState } from "react";
import { ButtonExcel, ModalDownloadScopework } from "src/shared/ui";
import { typeWorkApi } from "../../../../shared/api";
import { useAppSelector } from "../../../../shared/hooks";
import {
    IFinishUserAdding,
    IOneScopeWorkWithData,
    ITypeWork,
    IUser,
} from "../../../../shared/interfaces";

interface OneFullScopeWorkProps {
    scopeWork: IOneScopeWorkWithData;
}

const getTypeWork = (typeWorkId: number, data: ITypeWork[]) => {
    const findedTypeWork = data.find((item) => item.id === typeWorkId);
    if (findedTypeWork) {
        return findedTypeWork.name;
    }
};

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

const getPercent = (arr: IFinishUserAdding[]) => {
    const finishPercent = arr
        .map((item) => Number(item.percentForOneName))
        .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
    return finishPercent;
};

const getSumQuntity = (arr: IFinishUserAdding[]) => {
    const sumQuntity = arr
        .map((item) => Number(item.quntity))
        .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
    return sumQuntity;
};

const OneFullScopeWork: React.FC<OneFullScopeWorkProps> = ({ scopeWork }) => {
    // Получим типы работ
    const { isLoading: isLoadingType } = typeWorkApi.useGetAllTypeWorkQuery();
    const { listTypeWork } = useAppSelector((store) => store.typeWork);
    // Пользователей
    const { listUsers, isLoading: isLoadingUsers } = useAppSelector(
        (store) => store.users
    );
    const [open, setOpen] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const showChildrenDrawer = () => {
        setChildrenDrawer(true);
    };

    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    };

    const [showModal, setShowModal] = useState<boolean>(false);
    const handleClickShowModal = () => {
        setShowModal(true);
    };

    const itemsForCollapse = scopeWork.listNamesWithData.map((item) => {
        return {
            key: item.nameListId,
            label: (
                <Row>
                    <Space>
                        <Col>{item.name}</Col>
                        <Col>
                            <Tag color="cyan">{item.quntity} шт.</Tag>
                            <Progress
                                type="circle"
                                percent={getPercent(item.finishUserAdding)}
                                size={20}
                            />
                        </Col>
                        <Col>
                            <Tag color="green">
                                {`Выполнено
                                ${getSumQuntity(item.finishUserAdding).toFixed(
                                    2
                                )}`}
                            </Tag>
                            <Tag color="orange">
                                {`Осталось выполнить
                                ${
                                    Number(Number(item.quntity).toFixed(2)) -
                                    Number(
                                        getSumQuntity(
                                            item.finishUserAdding
                                        ).toFixed(2)
                                    )
                                }`}
                            </Tag>
                            {/* <Button type="primary" onClick={showChildrenDrawer}>
                                Two-level drawer
                            </Button> */}
                        </Col>
                    </Space>
                </Row>
            ),
            children: (
                <Row>
                    <Drawer
                        title="Информация"
                        width={320}
                        closable={false}
                        onClose={onChildrenDrawerClose}
                        open={childrenDrawer}
                    >
                        {<span>{scopeWork.id}</span>}
                    </Drawer>
                    {item.finishUserAdding.map((item) => (
                        <Row style={{ margin: 10 }} key={item.userId}>
                            <label>
                                <Space>
                                    {getUserName(item.userId, listUsers)}
                                    <Tag color="cyan">
                                        {Number(item.quntity).toFixed(2)}
                                    </Tag>
                                </Space>
                            </label>
                            <Progress
                                percent={Number(item.percentForOneName)}
                                status="active"
                            />
                        </Row>
                    ))}
                </Row>
            ),
        };
    });

    if (isLoadingType || isLoadingUsers) {
        return <Spin />;
    }

    return (
        <Row>
            <>
                <ModalDownloadScopework
                    open={showModal}
                    handleCancel={() => setShowModal(!showModal)}
                    idScopeWork={scopeWork.id.toString()}
                />
            </>
            <Card
                style={{ marginTop: 16, width: "100%" }}
                type="inner"
                title={getTypeWork(scopeWork.typeWorkId, listTypeWork)}
                extra={
                    <Space>
                        <Button onClick={showDrawer} type="primary">
                            Просмотр наименований
                        </Button>
                        <ButtonExcel handleClick={handleClickShowModal} />
                    </Space>
                }
            >
                <Row>
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
                                value={scopeWork.countTableAddingData.toFixed(
                                    2
                                )}
                                suffix={`/${scopeWork.countListNameWorksArr.toFixed(
                                    2
                                )}`}
                            />
                        </Col>
                        <Col style={{ margin: 10 }}>
                            <Progress
                                type="circle"
                                percent={Number(scopeWork.percentOneScopeWork)}
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
                            width: "100%",
                        }}
                    >
                        <div style={{ margin: 10 }}>
                            <Row>
                                <span>Пользователи участвующие на объекте</span>
                            </Row>
                            {scopeWork.listUsersData.map((user) => (
                                <Row style={{ margin: 10 }} key={user.userId}>
                                    <label>
                                        {getUserName(user.userId, listUsers)}
                                    </label>
                                    <Progress
                                        percent={Number(user.percent)}
                                        status="active"
                                    />
                                </Row>
                            ))}
                        </div>
                    </Row>
                </Row>
                <Row>
                    <Drawer
                        title="Список"
                        width={"70%"}
                        closable={false}
                        onClose={onClose}
                        open={open}
                    >
                        <Collapse
                            items={itemsForCollapse}
                            defaultActiveKey={["1"]}
                        />
                    </Drawer>
                </Row>
            </Card>
        </Row>
    );
};

export default OneFullScopeWork;
