import React from "react";
import { useLocation } from "react-router";
import { CheckAuth, CheckRole } from "../../entities";
import { authApi } from "../../shared/api";
import { RoleString } from "../../shared/config";
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
    } = useAppSelector((state) => state.auth);

    const { isSuccess, isLoading: isLoadingCheck } = authApi.useCheckQuery();
    return (
        <CheckAuth
            isAuth={isAuth}
            isSuccess={isSuccess}
            location={location}
            isLoading={isLoading || isLoadingCheck}
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
