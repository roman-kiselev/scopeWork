import React, { useEffect } from "react";
import { CheckAuth } from "../../entities";
import { authApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

interface ICheckA {
    children: React.ReactNode;
    location: any;
}

const CheckA: React.FC<ICheckA> = ({ children, location }) => {
    const [refreshToken, { isSuccess, isLoading: isLoadingCheck }] =
        authApi.useRefreshMutation();
    useEffect(() => {
        refreshToken();
    }, []);
    const { isAuth, isLoading } = useAppSelector((state) => state.auth);
    return (
        <CheckAuth
            isAuth={isAuth}
            isSuccess={isSuccess}
            location={location}
            isLoading={isLoading || isLoadingCheck}
        >
            {children}
        </CheckAuth>
    );
};

export default CheckA;
