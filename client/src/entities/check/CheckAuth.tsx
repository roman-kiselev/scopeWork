import { Spin } from "antd";
import React from "react";
import { useLocation, Navigate } from "react-router";
import { authApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

interface ICheckAuthProps {
    children: React.ReactNode;
    location: any;
    isAuth: boolean;
    isLoading?: boolean;
    isSuccess: boolean;
}

const CheckAuth: React.FC<ICheckAuthProps> = ({
    children,
    isAuth,
    isLoading,
    isSuccess,
    location,
}) => {
    // const location = useLocation();
    // const { isAuth, isLoading } = useAppSelector((state) => state.auth);
    // const { isSuccess } = authApi.useCheckQuery();
    // Можно вставить загрузку (спиннер)
    if (isLoading) {
        return <Spin />;
    }
    if (isSuccess) {
        return <>{children}</>;
    }

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default CheckAuth;
