import { Spin } from "antd";
import { objectsApi } from "../../../shared/api";
import OneShortObject from "./OneShortObject";

const ListShortObject = () => {
    const { data, isLoading } = objectsApi.useGetAllShortDataQuery();
    if (isLoading) {
        return <Spin />;
    }

    return (
        <>
            {data?.map((object) => (
                <OneShortObject key={object.id} {...object} />
            ))}
        </>
    );
};

export default ListShortObject;
