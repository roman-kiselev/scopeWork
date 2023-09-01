import { lazy } from "react";
import { Route, Routes } from "react-router";
import { SuspenseLoad } from "../../../entities";

const CreateObject = lazy(() => import("./CreateObject"));
const ScopeObject = lazy(() => import("./ScopeObject"));
const ConfigAndListObjects = lazy(() => import("./ConfigAndListObjects"));
const OneObjectconfig = lazy(() => import("./OneObjectConfig"));
const CreateListNameWork = lazy(() => import("./CreateListNameWork"));
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
                path="scope"
                element={
                    <SuspenseLoad>
                        <ScopeObject />
                    </SuspenseLoad>
                }
            />
            <Route
                path="list"
                element={
                    <SuspenseLoad>
                        <CreateListNameWork />
                    </SuspenseLoad>
                }
            />
        </Routes>
    );
};

export default AdminObjectsRoutes;
