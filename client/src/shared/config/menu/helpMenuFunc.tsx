import { MenuProps } from "antd";
import { RoleString } from "../RoleString";

function findRole(roles: RoleString[], roleState: RoleString[]): boolean {
    // Пробегаеимся по roleState
    // Разрешённые роли в массиве role
    let foundMatch = false;
    roleState.forEach((oneRole: string) => {
        roles.forEach((role: string) => {
            if (role === oneRole) {
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
    roleState: RoleString[] | [],
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
