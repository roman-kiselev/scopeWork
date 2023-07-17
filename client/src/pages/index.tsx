import React from "react";
import { Routes, Route } from "react-router";
import { FormLogin } from "../entities/formLogin";
import FormRegister from "../entities/formRegister/FormRegister";
import { LayoutAuth } from "../entities/layoutAuth";
import NoAccess from "./noAccess";




const Routing = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <LayoutAuth>
                        <FormRegister />
                    </LayoutAuth>
                }
            />
            <Route path="/login" element={<FormLogin />} />
            <Route path="/register" element={<FormRegister />} />
            <Route path="*" element={<NoAccess />} />
        </Routes>
    );
};

export default Routing;
