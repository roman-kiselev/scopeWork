import { Button, Drawer, Timeline } from "antd";
import { IUnit } from "src/shared/interfaces";
import { IDataGetHistoryForNameWorkId } from "src/shared/interfaces/api";
import { getDate, getUnit } from "src/shared/utils";

interface IDrawerTimelineNameWork {
    name: string;
    onClose: () => void;
    open: boolean;
    dataTimeline: IDataGetHistoryForNameWorkId[];
    dataUnit: IUnit[];
    unitId: number;
}

const DrawerTimelineNameWork: React.FC<IDrawerTimelineNameWork> = ({
    name,
    onClose,
    open,
    dataTimeline,
    dataUnit,
    unitId,
}) => {
    return (
        <>
            <Drawer title={name} onClose={onClose} open={open}>
                <Timeline
                    items={dataTimeline.map((item) => ({
                        children: (
                            <>
                                <p>
                                    {item.id}. {item.firstname} {item.lastname}{" "}
                                    - {item.quntity}{" "}
                                    {getUnit(dataUnit, unitId) || `ед.`}- (
                                    {getDate(item.createdAt)})
                                </p>{" "}
                                <Button size="small">
                                    Пометить на удаление
                                </Button>
                            </>
                        ),
                    }))}
                />
            </Drawer>
        </>
    );
};

export default DrawerTimelineNameWork;
