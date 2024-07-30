import React from "react";
import { RoleString } from "src/shared/config";
import { CheckAuth, CheckRole } from "../../entities";
import { useAppSelector } from "../../shared/hooks";

interface ICheckAR {
    children: React.ReactNode;
    roles: RoleString[];
    location: any;
}
const CheckAR: React.FC<ICheckAR> = ({ children, roles, location }) => {
    const {
        isAuth,
        isLoading,
        roles: rolesState,
        token,
    } = useAppSelector((state) => state.auth);

    return (
        <CheckAuth
            isAuth={isAuth}
            isSuccess={token !== null}
            location={location}
            isLoading={isLoading}
        >
            <CheckRole
                location={location}
                roles={roles}
                rolesState={rolesState}
                isLoading={isLoading}
            >
                {children}
            </CheckRole>
        </CheckAuth>
    );
};

export default CheckAR;
