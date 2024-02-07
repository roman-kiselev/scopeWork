import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Progress, Spin, Tag } from "antd";
import { unitsApi } from "src/shared/api";
import { RoleString } from "src/shared/config";
import { useAppSelector } from "src/shared/hooks";
import { checkRole, getUnit } from "src/shared/utils";

interface IColumnNameProps {
    name: string;
    percent: string;
    quntity: number;
    count: number;
    unitId: number;
    isLoading: boolean;
}

const ColumnName: React.FC<IColumnNameProps> = ({
    count,
    name,
    percent,
    quntity,
    unitId,
    isLoading,
}) => {
    const { roles } = useAppSelector((store) => store.auth);
    const { data: dataUnit } = unitsApi.useGetAllUnitsQuery();

    return (
        <>
            <p>{name}</p>
            {checkRole(roles, RoleString.MASTER) ||
            checkRole(roles, RoleString.ADMIN) ? (
                <Tag color="red">
                    Ост. {quntity - count} {getUnit(dataUnit, unitId) || `ед.`}
                </Tag>
            ) : null}
            <Button size="small">
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
    );
};

export default ColumnName;
