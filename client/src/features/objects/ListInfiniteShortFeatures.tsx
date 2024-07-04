import { useEffect } from "react";
import { ListInfiniteShort, OneObjectShort } from "../../entities";
import { objectsApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

const ListInfiniteShortFeatures = () => {
    //const {data} = objectsApi.useGetAllObjectsQuery()
    useEffect(() => {
        objectsApi.endpoints.getAllObjects.initiate();
    }, []);
    const { listObject } = useAppSelector((state) => state.objects);
    return (
        <ListInfiniteShort data={listObject}>
            {listObject.map((object) => (
                <OneObjectShort object={object} key={object.id} />
            ))}
        </ListInfiniteShort>
    );
};

export default ListInfiniteShortFeatures;
