import { RoleString } from "../config";

export const checkRole = (data: string[], name: RoleString): boolean => {
    const findedRole = data.find((item) => item === name);
    if (findedRole) {
        return true;
    }
    return false;
};
