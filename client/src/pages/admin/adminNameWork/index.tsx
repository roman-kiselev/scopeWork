import { lazy } from "react";
import { Route, Routes } from "react-router";
import { SuspenseLoad } from "../../../entities";

const Catalog = lazy(() => import("./Catalog"));
const CreateNameWork = lazy(() => import("./CreateNameWork"));
const Operation = lazy(() => import("./Operation"));
const Unit = lazy(() => import("./Unit"));

const AdminNameWorkRoutes = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <SuspenseLoad>
                        <Catalog />
                    </SuspenseLoad>
                }
            />
            <Route
                path="create"
                element={
                    <SuspenseLoad>
                        <CreateNameWork />
                    </SuspenseLoad>
                }
            />

            <Route
                path="unit"
                element={
                    <SuspenseLoad>
                        <Unit />
                    </SuspenseLoad>
                }
            />
            <Route
                path="othersOperation"
                element={
                    <SuspenseLoad>
                        <Operation />
                    </SuspenseLoad>
                }
            />
        </Routes>
    );
};

export default AdminNameWorkRoutes;
