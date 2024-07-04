import { lazy } from "react";
import { Route, Routes } from "react-router";
import { SuspenseLoad } from "../../../entities";
import NameWorkRouter from "./nameWork";

const CreateObject = lazy(() => import("./CreateObject"));
// const ScopeObject = lazy(() => import("./ScopeObject"));
const ScopeWorkRouter = lazy(() => import("./scopeWork"));
const ConfigAndListObjects = lazy(() => import("./ConfigAndListObjects"));
const OneObjectconfig = lazy(() => import("./OneObjectConfig"));
// const CreateListNameWork = lazy(() => import("./nameWork/HomeNameWork"));
const AdminObjectsRoutes = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <SuspenseLoad>
                        <ConfigAndListObjects />
                    </SuspenseLoad>
                }
            />
            <Route
                path=":id"
                element={
                    <SuspenseLoad>
                        <OneObjectconfig />
                    </SuspenseLoad>
                }
            />
            <Route
                path="create"
                element={
                    <SuspenseLoad>
                        <CreateObject />
                    </SuspenseLoad>
                }
            />
            <Route
                path="scope/*"
                element={
                    <SuspenseLoad>
                        <ScopeWorkRouter />
                    </SuspenseLoad>
                }
            />
            <Route
                path="list/*"
                element={
                    <SuspenseLoad>
                        <NameWorkRouter />
                    </SuspenseLoad>
                }
            />
        </Routes>
    );
};

export default AdminObjectsRoutes;
