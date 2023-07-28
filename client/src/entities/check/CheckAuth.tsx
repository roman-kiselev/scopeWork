import { Spin } from "antd";
import React from "react";
import { Navigate, useLocation } from "react-router";
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
    if (isLoading) {
        return <Spin />;
    }
    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default CheckAuth;
