import React, { lazy } from "react";
import { Routes, Route } from "react-router";
import { SuspenseLoad } from "../entities";
import {
    CheckA,
    SuspenseLoadCheckA,
    SuspenseLoadCheckAR,
    SuspenseLoadCheckR,
} from "../features";
import { RoleString } from "../shared/config";
import NoAccess from "./noAccess";

const LoginPage = lazy(() => import("./auth/LoginPage"));
const RegisterPage = lazy(() => import("./auth/RegisterPage"));
const HomePage = lazy(() => import("./home/HomePage"));

const Routing = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <SuspenseLoadCheckAR
                        roles={[RoleString.USER, RoleString.ADMIN]}
                    >
                        <HomePage />
                    </SuspenseLoadCheckAR>
                }
            />
            <Route
                path="/login"
                element={
                    <SuspenseLoad>
                        <LoginPage />
                    </SuspenseLoad>
                }
            />
            <Route
                path="/register"
                element={
                    <SuspenseLoad>
                        <RegisterPage />
                    </SuspenseLoad>
                }
            />
            <Route path="*" element={<NoAccess />} />
        </Routes>
    );
};

export default Routing;
