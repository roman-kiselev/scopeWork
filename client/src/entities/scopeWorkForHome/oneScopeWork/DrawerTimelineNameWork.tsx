import { QuestionCircleFilled } from "@ant-design/icons";
import { Button, Drawer, Space, Spin, Timeline } from "antd";
import { tableAddingDataApi } from "src/shared/api";
import { RoleString } from "src/shared/config";
import { useAppSelector } from "src/shared/hooks";
import { IRole, IUnit } from "src/shared/interfaces";
import { IDataGetHistoryForNameWorkId } from "src/shared/interfaces/api";
import { checkRole, getDate, getUnit } from "src/shared/utils";

interface IDrawerTimelineNameWork {
    name: string;
    onClose: () => void;
    open: boolean;
    dataTimeline: IDataGetHistoryForNameWorkId[];
    dataUnit: IUnit[];
    unitId: number;
    roles: IRole[];
    nameListId: number;
    nameWorkId: number;
    scopeWorkId: number;
    handleClickQuery: () => void;
    refetch: any;
    isLoading: boolean;
}

const DrawerTimelineNameWork: React.FC<IDrawerTimelineNameWork> = ({
    name,
    onClose,
    open,
    dataTimeline,
    dataUnit,
    unitId,
    roles,
    nameListId,
    nameWorkId,
    scopeWorkId,
    handleClickQuery,
    refetch,
    isLoading,
}) => {
    const { id } = useAppSelector((store) => store.auth);
    const [handleRemove, { data: DataRemove, isSuccess: isSuccessRemove }] =
        tableAddingDataApi.useRemoveMutation();
    const [handleRecovery, { data: dataRecover, isSuccess: isSuccessRecover }] =
        tableAddingDataApi.useRecoveryMutation();
    const [handleCandidateDel, { data: dataCandidate }] =
        tableAddingDataApi.useCreateCandidateDelMutation();
    const [handleConfirm, { data: dataConfirm }] =
        tableAddingDataApi.useConfirmMutation();

    const handleClickRemove = (id: number) => {
        handleRemove({ id: id });
        handleClickQuery();
        refetch();
    };
    const handleClickRecovery = (id: number) => {
        handleRecovery({ id: id });
        handleClickQuery();
        refetch();
    };

    const handleClickCandidate = (
        userId: number | null,
        tableAddingDataId: number
    ) => {
        handleCandidateDel({
            userId: userId !== null ? userId : 0,
            tableAddingDataId,
        });
        handleClickQuery();
        refetch();
    };

    const handleClickConfirm = (id: number, idDelCandidate: number) => {
        handleConfirm({ id, idDelCandidate });
        handleClickQuery();
        refetch();
    };

    if (isLoading) {
        return <Spin />;
    }

    return (
        <>
            <Drawer title={name} onClose={onClose} open={open}>
                <Timeline
                    items={dataTimeline.map((item) => ({
                        children: (
                            <>
                                <p
                                    style={
                                        item.deletedAt === null
                                            ? { color: "black" }
                                            : { color: "grey" }
                                    }
                                >
                                    {item.id}. {item.firstname} {item.lastname}{" "}
                                    - {item.quntity}{" "}
                                    {getUnit(dataUnit, unitId) || `ед.`}- (
                                    {getDate(item.createdAt)})
                                    {item.delCandidate !== null && (
                                        <QuestionCircleFilled
                                            style={{
                                                color: "red",
                                            }}
                                        />
                                    )}
                                </p>{" "}
                                {checkRole(roles, RoleString.MASTER) &&
                                    item.delCandidate === null &&
                                    item.deletedAt === null && (
                                        <Button
                                            onClick={() =>
                                                handleClickCandidate(
                                                    id,
                                                    item.id
                                                )
                                            }
                                            size="small"
                                        >
                                            Пометить на удаление
                                        </Button>
                                    )}
                                <Space>
                                    {checkRole(roles, RoleString.ADMIN) &&
                                        item.deletedAt === null && (
                                            <Button
                                                size="small"
                                                danger
                                                type="primary"
                                                onClick={() =>
                                                    handleClickRemove(item.id)
                                                }
                                            >
                                                Удалить
                                            </Button>
                                        )}
                                    {checkRole(roles, RoleString.ADMIN) &&
                                        item.deletedAt === null &&
                                        item.id !== null &&
                                        item.delCandidate !== null && (
                                            <Button
                                                onClick={() => {
                                                    if (
                                                        item.id !== null &&
                                                        item.delCandidate !==
                                                            null
                                                    ) {
                                                        handleClickConfirm(
                                                            item.id,
                                                            item.delCandidate
                                                        );
                                                    }
                                                }}
                                                size="small"
                                                type="primary"
                                            >
                                                Подтвердить удаление
                                            </Button>
                                        )}
                                    {checkRole(roles, RoleString.ADMIN) &&
                                        item.deletedAt !== null && (
                                            <Button
                                                size="small"
                                                style={{
                                                    backgroundColor: "yellow",
                                                }}
                                                onClick={() =>
                                                    handleClickRecovery(item.id)
                                                }
                                            >
                                                Восстановить
                                            </Button>
                                        )}
                                </Space>
                            </>
                        ),
                    }))}
                />
            </Drawer>
        </>
    );
};

export default DrawerTimelineNameWork;
