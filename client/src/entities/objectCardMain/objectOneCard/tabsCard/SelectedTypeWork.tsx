import { Spin } from "antd";
import React from "react";
import { useAppSelector } from "../../../../shared/hooks";

interface SelectedTypeWorkProps {
    tabName?: string;
}

const SelectedTypeWork: React.FC<SelectedTypeWorkProps> = () => {
    const { oneScopeWorkForOneTab, isLoading } = useAppSelector(
        (store) => store.dataOneUser
    );
    // useEffect(() => {
    //     dispatch(getDataByTabName({ name: tabName }));
    // }, [dispatch, tabName, oneScopeWorkForOneTab]);

    if (isLoading) {
        return <Spin />;
    }
    // console.log(oneScopeWorkForOneTab);

    return <div>Доступен объём №{oneScopeWorkForOneTab?.id}</div>;
};

export default SelectedTypeWork;
