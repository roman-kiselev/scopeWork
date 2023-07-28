import React from "react";
import { useLocation } from "react-router";
import { CheckRole } from "../../entities";
import { RoleString } from "../../shared/config";
import { useAppSelector } from "../../shared/hooks";

interface ICheckR {
    children: React.ReactNode;
    roles: RoleString[];
    location: any;
}

const CheckR: React.FC<ICheckR> = ({ children, roles, location }) => {
    const { roles: rolesState, isLoading } = useAppSelector(
        (state) => state.auth
    );

    return (
        <CheckRole
            location={location}
            isLoading={isLoading}
            rolesState={rolesState}
            roles={roles}
        >
            {children}
        </CheckRole>
    );
};

export default CheckR;
