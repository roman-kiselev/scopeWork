import { Card } from "antd";
import React, { useState } from "react";
import { useAppDispatch } from "../../../shared/hooks";
import { IObjectCreateResponse } from "../../../shared/interfaces";
import { getDataByTabName } from "../../../shared/models";

interface ITabList {
    key: string;
    tab: string;
    children: JSX.Element | string;
}

interface UniqueCardProps {
    object: IObjectCreateResponse;
    tabList: ITabList[];
}

const UniqueCard: React.FC<UniqueCardProps> = ({ object, tabList }) => {
    //const [collapsed, setCollapsed] = useState(false);
    const dispatch = useAppDispatch();
    const [activeTabKey1, setActiveTabKey1] = useState<string>("Главная");
    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
        dispatch(getDataByTabName({ name: key, objectId: object.id }));
    };

    return (
        <Card
            // type={"inner"}
            title={`${object.name} - ${object.address}`}
            extra={<a href="#">Подробнее</a>}
            tabList={tabList}
            activeTabKey={activeTabKey1}
            onTabChange={onTab1Change}
            style={{ margin: 10 }}
        />
    );
};

export default UniqueCard;
