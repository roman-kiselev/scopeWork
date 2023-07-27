import React from "react";
import { useLocation } from "react-router";
import { CheckRole } from "../../entities";
import { RoleString } from "../../shared/config";
import { useAppSelector } from "../../shared/hooks";

interface ICheckR {
    children: React.ReactNode;
    roles: RoleString[];
}

const CheckR: React.FC<ICheckR> = ({ children, roles }) => {
    const location = useLocation();
    const { roles: rolesState, isLoading } = useAppSelector(
        (state) => state.auth
    );

    return (
        <CheckRole location isLoading rolesState={rolesState} roles={roles}>
            {children}
        </CheckRole>
    );
};

export default CheckR;
