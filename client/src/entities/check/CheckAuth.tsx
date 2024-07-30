import { Spin } from "antd";
import React from "react";
import { Navigate } from "react-router";
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
    isLoading = false,
    location,
}) => {
    if (isLoading) <Spin />;

    if (!isAuth) {
        return <Navigate to="/welcome" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default CheckAuth;
