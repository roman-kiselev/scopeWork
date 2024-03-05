import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Progress, Spin, Tag } from "antd";
import React, { useState } from "react";
import { tableAddingDataApi, unitsApi } from "src/shared/api";
import { RoleString } from "src/shared/config";
import { useAppDispatch, useAppSelector } from "src/shared/hooks";
import { IDataGetHistoryForNameWorkId } from "src/shared/interfaces/api";
import { checkRole } from "src/shared/utils";
import DrawerTimelineNameWork from "../oneScopeWork/DrawerTimelineNameWork";

interface IColumnNameQuickProps {
    name: string;
    nameListId: number;
    nameWorkId: number;
    scopeWorkId: number;
    percent: number;
    unitName: string;
    unitId: number;
    refetch: any;
    isLoading: boolean;
    remainderQuntity: number;
}

const ColumnNameQuick: React.FC<IColumnNameQuickProps> = ({
    name,
    nameListId,
    nameWorkId,
    scopeWorkId,
    percent,
    unitName,
    unitId,
    refetch,
    isLoading,
    remainderQuntity,
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

    const handleClickQuery = async () => {
        const data = await dispatch(
            tableAddingDataApi.endpoints.historyForName.initiate({
                nameListId,
                nameWorkId,
                scopeWorkId: Number(scopeWorkId),
            })
        ).unwrap();

        setDataTimeline(data);
    };

    const handleClick = async () => {
        handleClickQuery();
        showDrawer();
    };

    return (
        <>
            <DrawerTimelineNameWork
                dataTimeline={dataTimeline}
                dataUnit={dataUnit || []}
                name={name}
                onClose={onClose}
                open={open}
                unitId={unitId}
                roles={roles}
                nameListId={nameListId}
                nameWorkId={nameListId}
                scopeWorkId={Number(scopeWorkId)}
                handleClickQuery={handleClickQuery}
                refetch={refetch}
                isLoading={isLoading}
            />
            <>
                <p>{name}</p>
                {checkRole(roles, RoleString.MASTER) ||
                checkRole(roles, RoleString.ADMIN) ? (
                    <Tag color="red">
                        Ост. {remainderQuntity} {unitName || `ед.`}
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

export default ColumnNameQuick;
