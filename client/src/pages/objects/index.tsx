import React, { lazy } from "react";
import { Route, Routes } from "react-router";
import { SuspenseLoadCheckAR } from "../../features";
import { RoleString } from "../../shared/config";
const ObjectPage = lazy(() => import("./ObjectPage"));

const ObjectsRoutes = () => {
    return (
        <Routes>
            <Route index element={<ObjectPage />} />
        </Routes>
    );
};

export default ObjectsRoutes;
