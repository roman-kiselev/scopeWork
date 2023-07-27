import React, { lazy } from "react";
import { Routes, Route } from "react-router";
import { SuspenseLoad } from "../entities";
import { FormLogin } from "../entities/formLogin";
import FormRegister from "../entities/formRegister/FormRegister";
import { LayoutAuth } from "../entities/layoutAuth";
import { HomePage } from "./home";
import NoAccess from "./noAccess";

const LoginPage = lazy(() => import("./auth/LoginPage"));
const RegisterPage = lazy(() => import("./auth/RegisterPage"));
const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
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
