import React from "react";
import { useLocation } from "react-router";
import { CheckAuth } from "../../entities";
import { authApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

interface ICheckA {
    children: React.ReactNode;
}

const CheckA: React.FC<ICheckA> = ({ children }) => {
    const location = useLocation();
    const { isAuth, isLoading } = useAppSelector((state) => state.auth);
    const { isSuccess, isLoading: isLoadingCheck } = authApi.useCheckQuery();
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
