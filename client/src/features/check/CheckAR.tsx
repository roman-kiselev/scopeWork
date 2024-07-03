import React, { useEffect } from "react";
import { RoleString } from "src/shared/config";
import { CheckAuth, CheckRole } from "../../entities";
import { authApi } from "../../shared/api";
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

    const [refreshToken, { isSuccess, isLoading: isLoadingCheck }] =
        authApi.useRefreshMutation();
    useEffect(() => {
        refreshToken();
    }, [refreshToken]);
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
