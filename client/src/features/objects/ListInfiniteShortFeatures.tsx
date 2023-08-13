import React from 'react';
import {ListInfiniteShort, OneObjectShort} from "../../entities";
import {useAppSelector} from "../../shared/hooks";
import {objectsApi} from "../../shared/api";

const ListInfiniteShortFeatures = () => {
    const {data} = objectsApi.useGetAllObjectsQuery()
    const {listObject} = useAppSelector((state) => state.objects)
    return (
        <ListInfiniteShort data={listObject}>
            {
                listObject.map((object) => (
                    <OneObjectShort object={object} key={object.id}/>
                ))
            }

        </ListInfiniteShort>
    );
};

export default ListInfiniteShortFeatures;