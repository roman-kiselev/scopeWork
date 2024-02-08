import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Progress, Spin, Tag } from "antd";
import { useState } from "react";
import { tableAddingDataApi, unitsApi } from "src/shared/api";
import { RoleString } from "src/shared/config";
import { useAppDispatch, useAppSelector } from "src/shared/hooks";
import { IDataGetHistoryForNameWorkId } from "src/shared/interfaces/api";
import { checkRole, getUnit } from "src/shared/utils";
import DrawerTimelineNameWork from "./DrawerTimelineNameWork";

interface IColumnNameProps {
    name: string;
    percent: string;
    quntity: number;
    count: number;
    unitId: number;
    isLoading: boolean;
    nameListId: number;
    nameWorkId: number;
    scopeWorkId: string;
}

const ColumnName: React.FC<IColumnNameProps> = ({
    count,
    name,
    percent,
    quntity,
    unitId,
    isLoading,
    nameListId,
    nameWorkId,
    scopeWorkId,
}) => {
    const dispatch = useAppDispatch();
    const { roles } = useAppSelector((store) => store.auth);
    const { data: dataUnit } = unitsApi.useGetAllUnitsQuery();
    const [dataTimeline, setDataTimeline] = useState<
        IDataGetHistoryForNameWorkId[] | []
    >([]);
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const handleClick = async () => {
        const data = await dispatch(
            tableAddingDataApi.endpoints.historyForName.initiate({
                nameListId,
                nameWorkId,
                scopeWorkId: Number(scopeWorkId),
            })
        ).unwrap();

        setDataTimeline(data);

        showDrawer();
    };

    return (
        <>
            {/* <>
                <Drawer title={name} onClose={onClose} open={open}>
                    <Timeline
                        items={dataTimeline.map((item) => ({
                            children: (
                                <>
                                    <p>
                                        {item.id}. {item.firstname}{" "}
                                        {item.lastname} - {item.quntity}{" "}
                                        {getUnit(dataUnit, unitId) || `ед.`}

                                    </p>{" "}
                                    <Button size="small">
                                        Пометить на удаление
                                    </Button>
                                </>
                            ),
                        }))}
                    />
                </Drawer>
            </> */}
            <DrawerTimelineNameWork
                dataTimeline={dataTimeline}
                dataUnit={dataUnit || []}
                name={name}
                onClose={onClose}
                open={open}
                unitId={unitId}
            />
            <>
                <p>{name}</p>
                {checkRole(roles, RoleString.MASTER) ||
                checkRole(roles, RoleString.ADMIN) ? (
                    <Tag color="red">
                        Ост. {quntity - count}{" "}
                        {getUnit(dataUnit, unitId) || `ед.`}
                    </Tag>
                ) : null}
                <Button onClick={handleClick} size="small">
                    <UnorderedListOutlined />
                </Button>
                {isLoading && <Spin />}

                {percent !== undefined && Number(percent) > 100 ? (
                    <Progress
                        percent={Number(percent)}
                        strokeColor="yellow"
                        status={"success"}
                    />
                ) : (
                    <Progress
                        percent={Number(percent)}
                        status={
                            percent === undefined || Number(percent) < 100
                                ? "active"
                                : "success"
                        }
                    />
                )}
            </>
        </>
    );
};

export default ColumnName;
