import { Divider, Row, Spin } from "antd";
import { useParams } from "react-router";
import { objectsApi } from "../../../../shared/api";
import { useAppSelector } from "../../../../shared/hooks";
import ListFullScopeWork from "./ListFullScopeWork";
import ObjectInfo from "./ObjectInfo";

const OneObjectFull = () => {
    const { id: idObject } = useParams();
    const { isLoading: isLoadingQuery } = objectsApi.useGetFullDataForOneQuery(
        Number(idObject)
    );
    const { oneObjectWithFullData, isLoading: isLoadingStore } = useAppSelector(
        (store) => store.objects
    );

    if (isLoadingQuery || isLoadingStore) {
        return <Spin />;
    }

    return (
        <Row style={{ display: "flex", flexDirection: "column" }}>
            <Row>
                <h2>{oneObjectWithFullData?.name}</h2>
            </Row>
            <Row>
                <h4>{oneObjectWithFullData?.address}</h4>
            </Row>
            <Divider />
            {oneObjectWithFullData && (
                <>
                    <ObjectInfo oneObjectWithFullData={oneObjectWithFullData} />
                    <ListFullScopeWork
                        objectData={oneObjectWithFullData.objectData}
                    />
                </>
            )}
        </Row>
    );
};

export default OneObjectFull;
