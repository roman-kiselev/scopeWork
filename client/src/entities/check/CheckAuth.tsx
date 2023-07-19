import React from "react";
import { useLocation, Navigate } from "react-router";
import { authApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

interface ICheckAuthProps {
    children: React.ReactNode;
}

const CheckAuth: React.FC<ICheckAuthProps> = ({ children }) => {
    const location = useLocation();
    const { isAuth, isLoading } = useAppSelector((state) => state.auth);
    const { isSuccess } = authApi.useCheckQuery();
    // Можно вставить загрузку (спиннер)
    if (isSuccess) {
        return <>{children}</>;
    }
    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default CheckAuth;
