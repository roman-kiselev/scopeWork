import { Button, Drawer, Space } from "antd";
import React, { useState } from "react";
import { useAppSelector } from "../../../shared/hooks";
import { IUnit } from "../../../shared/interfaces";

interface IDrawerOneList {
    id: number;
}

const getUnitName = (id: number, arr: IUnit[]) => {
    const findedUnit = arr.find((item) => item.id === id);
    return findedUnit?.name;
};

const DrawerOneList: React.FC<IDrawerOneList> = ({ id }) => {
    const { listUnits } = useAppSelector((store) => store.unit);
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    // Получаем списки
    const { nameWorksSelected } = useAppSelector((store) => store.scopeWork);
    const findedList = nameWorksSelected?.find((item) => item.id === id);
    const data = findedList?.nameWorks;

    return (
        <>
            <Space>
                <Button type="primary" onClick={showDrawer}>
                    Просмотр
                </Button>
            </Space>
            <Drawer
                title={`Лист №${findedList?.id} - ${findedList?.name}`}
                placement="right"
                closable={false}
                onClose={onClose}
                open={open}
            >
                <p>Описание: {findedList?.description ?? ""}</p>

                {data?.map((item, index) => (
                    <p key={item.id}>
                        {index + 1}. {item.name} - {item.NameList.quntity}{" "}
                        {getUnitName(item.unitId, listUnits)}
                    </p>
                ))}
            </Drawer>
        </>
    );
};

export default DrawerOneList;
