import { Spin } from "antd";
import React from "react";
import { Navigate } from "react-router";
import { RoleString } from "../../shared/config";

function findRole(roles: string[], roleState: string[]): boolean {
    // Используем метод some для упрощения логики
    return roleState.some((oneRole) => roles.includes(oneRole));
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
    isLoading = false,
}) => {
    if (isLoading) <Spin />;

    const hasAccess = findRole(roles, rolesState);
    if (!hasAccess) {
        return <Navigate to="/no_access" state={{ from: location }} />;
    }
    return <>{children}</>;
};

export default CheckRole;
