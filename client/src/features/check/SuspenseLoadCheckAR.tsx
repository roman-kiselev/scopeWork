import React from "react";
import { useLocation } from "react-router";
import { SuspenseLoad } from "../../entities";
import { RoleString } from "../../shared/config";
import CheckA from "./CheckA";
import CheckR from "./CheckR";

interface ISuspenseLoadCheckAR {
    children: React.ReactNode;
    roles: RoleString[];
}

const SuspenseLoadCheckAR: React.FC<ISuspenseLoadCheckAR> = ({
    children,
    roles,
}) => {
    const location = useLocation();
    return (
        <SuspenseLoad>

                            <CheckA location={location}>
                <CheckR location={location} roles={roles}>
                    {children}
                </CheckR>
            </CheckA>
        </SuspenseLoad>
    );
};

export default SuspenseLoadCheckAR;
