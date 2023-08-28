import { SimpleShortItemForList, SimpleShortList } from "../../../entities";
import { userApi } from "../../../shared/api";
import { IUser } from "../../../shared/interfaces";

interface INewUser {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
}

const getDataItem = (data: IUser[]) => {
    const newData = data.map((user, index) => {
        const { userDescription } = user;
        const { firstname, lastname } = userDescription;
        return {
            id: user.id,
            name: user.email,
            firstname: firstname,
            lastname: lastname,
        } as INewUser;
    });
    return newData;
};

const ListUser = () => {
    const { data, isSuccess } = userApi.useGetAllUsersQuery();
    console.log(data, isSuccess);

    const dataUser: INewUser[] = getDataItem(data || []);

    return (
        <>
            {isSuccess && (
                <SimpleShortList title="Список пользователей">
                    {dataUser.map((user, index) => (
                        <SimpleShortItemForList
                            id={user.id}
                            name={user.name}
                            firstName={user.firstname}
                            lastName={user.lastname}
                            key={user.id}
                            index={index}
                        />
                    ))}
                </SimpleShortList>
            )}
        </>
    );
};

export default ListUser;
