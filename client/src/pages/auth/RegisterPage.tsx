import React from "react";
import FormRegister from "../../entities/formRegister/FormRegister";
import { LayoutAuth } from "../../entities/layoutAuth";

const RegisterPage = () => {
    return (
        <>
            <LayoutAuth>
                <FormRegister />
            </LayoutAuth>
        </>
    );
};

export default RegisterPage;
