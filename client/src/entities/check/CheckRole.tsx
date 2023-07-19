import React from "react";
import { useLocation } from "react-router";
import { IRole } from "../../shared/interfaces";

function findRole(roles: string[], roleState: IRole[]): boolean {
    //const { role, roleState } = arg;
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

interface CheckRoleProps {
    children: React.ReactNode;
    role: IRole;
}

const CheckRole: React.FC<CheckRoleProps> = ({ children, role }) => {
    const location = useLocation();
    return <div>CheckRole</div>;
};

export default CheckRole;
