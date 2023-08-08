import { MenuProps } from "antd";
import { IRole } from "../../interfaces";
import { RoleString } from "../RoleString";

function findRole(roles: RoleString[], roleState: IRole[]): boolean {
    // Пробегаеимся по roleState
    // Разрешённые роли в массиве role
    let foundMatch = false;
    roleState.forEach((oneRole: IRole) => {
        roles.forEach((role: string) => {
            if (role === oneRole.name) {
                foundMatch = true;
            }
        });
    });
    return foundMatch;
}

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    roles: RoleString[] | [],
    roleState: IRole[] | [],
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem | null {
    if (!findRole(roles, roleState)) {
        return null;
    }
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export { getItem };
