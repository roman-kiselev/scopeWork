import React from "react";
import { useLocation } from "react-router";
import { CheckAuth } from "../../entities";
import { authApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

interface ICheckA {
    children: React.ReactNode;
    location: any;
}

const CheckA: React.FC<ICheckA> = ({ children, location }) => {
    const { isSuccess, isLoading: isLoadingCheck } = authApi.useCheckQuery();
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
