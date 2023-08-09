import React, { lazy } from "react";
import { Routes, Route } from "react-router";

const UsersRouter = lazy(() => import("./adminUser"));
const ObjectsRouter = lazy(() => import("./adminObjects"));
const NameWorkRouter = lazy(() => import("./adminNameWork"));

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="users/*" element={<UsersRouter />} />
            <Route path="object/*" element={<ObjectsRouter />} />
            <Route path="nomenclature/*" element={<NameWorkRouter />} />
        </Routes>
    );
};

export default AdminRoutes;
