import { Button, Row } from "antd";
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
    addObject,
    addTypeWork,
    addUsers,
    resetScopeWorkData,
    selectedTypeWorkIdInScopeWork,
} from "../../../shared/models";
import { SelectObject, SelectTypeWork, SelectUser } from "../../../shared/ui";
import BodyCreateScopeWork from "./BodyCreateScopeWork";

const getOptionsObjectUsersTypeWork = (
    arrUsers: IUser[],
    arrTypeWork: ITypeWork[],
    arrObject: IObjectCreateResponse[]
) => {
    const listUsersOption = arrUsers.map((item) => {
        const { firstname, lastname, userId } = item.userDescription;

        const label = `${lastname ?? ""} ${Array.from(firstname)[0] ?? ""}.`;
        return {
            value: userId,
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

const CreateScopeWork = () => {
    const dispatch = useAppDispatch();
    const [createScopeWork] = scopeWorkApi.useCreateMutation();
    const { data: dataObject } = objectsApi.useGetAllObjectsQuery();
    const { data: dataUsers } = userApi.useGetAllUsersQuery();
    const { data: dataTypeWork } = typeWorkApi.useGetAllTypeWorkQuery();
    const { listUsers } = useAppSelector((store) => store.users);
    const { listTypeWork } = useAppSelector((store) => store.typeWork);
    const { listObject } = useAppSelector((store) => store.objects);
    const { listObjectOption, listTypeWorkOption, listUsersOption } =
        getOptionsObjectUsersTypeWork(listUsers, listTypeWork, listObject);
    //const [selectedTypeWork, setSelectedTypeWork] = useState();
    const handleSetTypeWork = (value: string) => {
        dispatch(selectedTypeWorkIdInScopeWork(value));
        if (dataTypeWork) {
            dispatch(
                addTypeWork({ listTypeWork: dataTypeWork, typeWorkId: value })
            );
        }
    };
    const handleSetObject = (value: string) => {
        if (dataObject) {
            dispatch(addObject({ listObject: dataObject, objectId: value }));
        }
    };
    const handleSetUsers = (arr: string[]) => {
        if (dataUsers) {
            dispatch(addUsers({ listUser: dataUsers, listSelected: arr }));
        }
    };
    // Получаем данные для создания
    const { scopeWorkData } = useAppSelector((store) => store.scopeWork);
    const { listNameWork, object, typeWork, users } = scopeWorkData;
    const listIdlistNameWork = listNameWork?.map((item) => item.id);
    const objectId = object?.id;
    const typeWorkId = typeWork?.id;
    const usersId = users?.map((item) => item.id);
    const handleClickCreate = () => {
        if (objectId && typeWorkId) {
            createScopeWork({
                listNameWork: listIdlistNameWork,
                objectId: objectId,
                typeWorkId: typeWorkId,
                users: usersId,
            });
            dispatch(resetScopeWorkData());
        }
    };

    return (
        <>
            <Row
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                }}
            >
                <Row
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                    }}
                >
                    <h4>Создание нового объёма работ</h4>
                    <SelectTypeWork
                        handleChange={handleSetTypeWork}
                        options={listTypeWorkOption}
                    />
                    <SelectObject
                        //defaultValue={}
                        handleChange={handleSetObject}
                        options={listObjectOption}
                    />
                    <SelectUser
                        defaultValue={[]}
                        handleChange={handleSetUsers}
                        options={listUsersOption}
                    />
                    <Button
                        onClick={handleClickCreate}
                        disabled={
                            listNameWork.length === 0 ||
                            users.length === 0 ||
                            typeWork === null ||
                            object === null
                        }
                        type="primary"
                    >
                        Создать объём
                    </Button>
                </Row>
            </Row>
            <Row>
                <BodyCreateScopeWork />
            </Row>
        </>
    );
};

export default CreateScopeWork;
