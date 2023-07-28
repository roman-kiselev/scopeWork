import React from "react";
import { useLocation } from "react-router";
import { SuspenseLoad } from "../../entities";
import { RoleString } from "../../shared/config";
import CheckR from "./CheckR";

interface ISuspenseLoadCheckR {
    children: React.ReactNode;
    roles: RoleString[];
}

const SuspenseLoadCheckR: React.FC<ISuspenseLoadCheckR> = ({
    children,
    roles,
}) => {
    const location = useLocation();
    return (
        <SuspenseLoad>
            <CheckR location={location} roles={roles}>
                {children}
            </CheckR>
        </SuspenseLoad>
    );
};

export default SuspenseLoadCheckR;
