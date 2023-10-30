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
    const [editScopeWork, { isLoading: isLoadingEdit }] =
        scopeWorkApi.useEditScopeWorkMutation();
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
        listNameWork,
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
    });

    // Изменяем пользователей
    const handleChangeUsers = (arr: string[]) => {
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

    const handleEditScopeWork = () => {
        const userArr = users.map((item) => item.id);
        const arrListId = listNameWork.map((item) => item.id);
        console.log(userArr, arrListId);
        if (idScopeWork && object && typeWork) {
            editScopeWork({
                scopeWorkId: idScopeWork,
                listNameWork: arrListId,
                users: userArr,
                objectId: object?.id,
                typeWorkId: typeWork.id,
            });
        }
    };

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
                onClick={handleEditScopeWork}
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
