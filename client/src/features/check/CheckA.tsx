import React from "react";
import { Location } from "react-router";
import { CheckAuth } from "../../entities";
import { useAppSelector } from "../../shared/hooks";

interface ICheckA {
    children: React.ReactNode;
    location: Location;
}

const CheckA: React.FC<ICheckA> = ({ children, location }) => {
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
