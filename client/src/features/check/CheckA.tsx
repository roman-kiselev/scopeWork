import React from "react";
import { CheckAuth } from "../../entities";
import { useAppSelector } from "../../shared/hooks";

interface ICheckA {
    children: React.ReactNode;
    location: any;
}

const CheckA: React.FC<ICheckA> = ({ children, location }) => {
    // const [refreshToken, { isSuccess, isLoading: isLoadingCheck }] =
    //     authApi.useRefreshMutation();
    // useEffect(() => {
    //     refreshToken();
    // }, []);
    const { token, isLoading, isAuth } = useAppSelector((state) => state.auth);

    return (
        <CheckAuth
            isAuth={isAuth}
            isSuccess={token !== null}
            location={location}
            isLoading={isLoading}
        >
            {children}
        </CheckAuth>
    );
};

export default CheckA;
