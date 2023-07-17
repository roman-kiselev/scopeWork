import React from "react";
import { Routes, Route } from "react-router";
import { FormLogin } from "../entities/formLogin";
import FormRegister from "../entities/formRegister/FormRegister";
import { LayoutAuth } from "../entities/layoutAuth";
import { LoginPage, RegisterPage } from "./auth";
import { HomePage } from "./home";
import NoAccess from "./noAccess";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NoAccess />} />
        </Routes>
    );
};

export default Routing;
