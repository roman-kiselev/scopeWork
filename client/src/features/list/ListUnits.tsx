import { SimpleShortItemForList, SimpleShortList } from "../../entities";
import { unitsApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

const ListUnits = () => {
    const { isSuccess } = unitsApi.useGetAllUnitsQuery();
    const { listUnits } = useAppSelector((state) => state.unit);

    return (
        <>
            {listUnits.length > 0 ? (
                <SimpleShortList title={"Список"}>
                    {listUnits.map(({ id, name, description }, index) => (
                        <SimpleShortItemForList
                            index={index}
                            key={id}
                            id={id}
                            name={name}
                            description={description}
                        />
                    ))}
                </SimpleShortList>
            ) : (
                <></>
            )}
        </>
    );
};

export default ListUnits;
