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
import ObjectPage from "./objects/ObjectPage";

const LoginPage = lazy(() => import("./auth/LoginPage"));
const RegisterPage = lazy(() => import("./auth/RegisterPage"));
const HomePage = lazy(() => import("./home/HomePage"));
const LayoutPage = lazy(() => import("./home/LayoutPage"));
const ObjectsRoutes = lazy(() => import("./objects/index"));

const Routing = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <SuspenseLoadCheckAR
                        roles={[RoleString.USER, RoleString.ADMIN]}
                    >
                        <LayoutPage />
                    </SuspenseLoadCheckAR>
                }
            >
                <Route index element={<HomePage />} />

                <Route
                    path="objects"
                    element={
                        <SuspenseLoadCheckR
                            roles={[
                                RoleString.USER,
                                RoleString.ADMIN,
                                RoleString.DEV,
                            ]}
                        >
                            <ObjectsRoutes />
                        </SuspenseLoadCheckR>
                    }
                />
            </Route>
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
