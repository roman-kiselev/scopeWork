import { Button, Row, Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router";
import {
    objectsApi,
    scopeWorkApi,
    typeWorkApi,
    userApi,
} from "../../../shared/api";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import {
    IObjectCreateResponse,
    ITypeWork,
    IUser,
} from "../../../shared/interfaces";
import {
    editUsers,
    selectedTypeWorkIdInScopeWork,
} from "../../../shared/models";
import { SelectObject, SelectTypeWork, SelectUser } from "../../../shared/ui";

interface SelectedDataProps {
    handleChangeTypeWork: (value: string) => void;
    selectedValueTypeWork?: string;

    handleChangeObject: (value: string) => void;
    selectedValueObject?: string;

    handleChangeUsers: (value: string) => void;
    selectedValueUsers?: string;
}

const getOptionsObjectUsersTypeWork = (
    arrUsers: IUser[],
    arrTypeWork: ITypeWork[],
    arrObject: IObjectCreateResponse[]
) => {
    const listUsersOption = arrUsers.map((item) => {
        const { firstname, lastname, userId } = item.userDescription;

        const label = `${lastname ?? ""} ${Array.from(firstname)[0] ?? ""}.`;
        return {
            value: userId.toString(),
            label,
        };
    });
    const listTypeWorkOption = arrTypeWork.map((item) => {
        const { id, name } = item;
        return {
            label: name,
            value: id,
        };
    });
    const listObjectOption = arrObject.map((item) => {
        const { id, name } = item;
        return {
            label: name,
            value: id,
        };
    });

    return {
        listObjectOption,
        listTypeWorkOption,
        listUsersOption,
    };
};

const SelectedData = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const {
        data,
        isError,
        isLoading: isLoadingOneScopeWork,
    } = scopeWorkApi.useGetOneByIdScopeWorkQuery({
        id: Number(id),
    });
    const { data: dataObject } = objectsApi.useGetAllObjectsQuery();
    const { data: dataUsers, isLoading: isLoadingUsers } =
        userApi.useGetAllUsersQuery();
    const { data: dataTypeWork, isLoading: isLoadingTypeWork } =
        typeWorkApi.useGetAllTypeWorkQuery();
    const { isLoading } = useAppSelector((store) => store.scopeWork);
    const {
        object,
        typeWork,
        users,
        id: idScopeWork,
    } = useAppSelector((store) => store.scopeWork.selectedScopeWorkById);
    useEffect(() => {
        dispatch(selectedTypeWorkIdInScopeWork(typeWork?.id));
    }, [typeWork]);
    if (
        isLoadingOneScopeWork ||
        isLoading ||
        isLoadingUsers ||
        isLoadingTypeWork
    ) {
        return <Spin />;
    }

    const typeWorkName = typeWork?.name ?? "";
    const objectName = object?.name ?? "";
    const namesUser = users?.map((user) => {
        const findedUser = dataUsers?.find((item) => item.id === user.id);
        const firstname = Array.from(
            findedUser?.userDescription.firstname ?? ""
        )[0];
        const name = `${findedUser?.userDescription.lastname} ${firstname}`;

        return findedUser?.id.toString() ?? "";
        // return `${findedUser?.userDescription.lastname ?? ""} ${
        //     Array.from(findedUser?.userDescription.firstname ?? "")[0] ?? ""
        // }.`;
    });
    console.log(namesUser);
    // Изменяем пользователей
    const handleChangeUsers = (arr: string[]) => {
        console.log(arr);
        // let arrUsers = users.map((item) => item.id.toString());
        if (dataUsers) {
            dispatch(
                editUsers({
                    listUser: dataUsers,
                    listSelected: arr,
                })
            );
        }
    };
    const { listObjectOption, listTypeWorkOption, listUsersOption } =
        getOptionsObjectUsersTypeWork(
            dataUsers ?? [],
            dataTypeWork ?? [],
            dataObject ?? []
        );

    return (
        <Row
            style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
            }}
        >
            <h4>Объём работ №{idScopeWork}</h4>
            <SelectTypeWork
                defaultValue={typeWorkName}
                disabled={true}
                handleChange={() => {}}
                options={listTypeWorkOption}
            />
            <SelectObject
                defaultValue={objectName}
                disabled={true}
                handleChange={() => {}}
                options={listObjectOption}
            />
            <SelectUser
                defaultValue={namesUser}
                handleChange={handleChangeUsers}
                options={listUsersOption}
            />
            <Button
                onClick={() => {}}
                // disabled={
                //     listNameWork.length === 0 ||
                //     users.length === 0 ||
                //     typeWork === null ||
                //     object === null
                // }
                type="primary"
            >
                Сохранить изменения
            </Button>
        </Row>
    );
};

export default SelectedData;
