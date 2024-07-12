import { Spin } from "antd";
import { useEffect } from "react";
import { authApi } from "../api";

interface IAuthMiddlewareProps {
    children: React.ReactNode;
}
const AuthMiddleware: React.FC<IAuthMiddlewareProps> = ({ children }) => {
    // const [cookies] = useCookies(["logged_in"]);
    const [refreshToken, { isLoading }] = authApi.useRefreshMutation();
    useEffect(() => {
        refreshToken();
    }, []);

    if (isLoading) <Spin />;

    return <>{children}</>;
};

export default AuthMiddleware;
