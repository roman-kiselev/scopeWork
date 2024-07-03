import { Spin } from "antd";
import React from "react";
import { Navigate } from "react-router";
import { RoleString } from "../../shared/config";

function findRole(roles: string[], roleState: string[]): boolean {
    //const { role, roleState } = arg;
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

interface CheckRoleProps {
    children: React.ReactNode;
    roles: RoleString[];
    rolesState: string[];
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
