import { Spin } from "antd";
import React from "react";
import { Navigate, useLocation } from "react-router";
import { RoleString } from "../../shared/config";
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
    roles: RoleString[];
    rolesState: IRole[];
    isLoading?: boolean;
    location: any;
}

const CheckRole: React.FC<CheckRoleProps> = ({
    children,
    rolesState,
    roles,
    location,
    isLoading,
}) => {
    if (isLoading) {
        return <Spin />;
    }

    const isRole = findRole(roles, rolesState);
    if (!isRole) {
        return <Navigate to="/no_access" state={{ from: location }} />;
    }
    return <>{children}</>;
};

export default CheckRole;
