import { RoleString } from "../config";
import { IRole } from "../interfaces";

export const checkRole = (data: IRole[], name: RoleString): boolean => {
    const findedRole = data.find((item) => item.name === name);
    if (findedRole) {
        return true;
    }
    return false;
};
