import { lazy } from "react";
import { Route, Routes } from "react-router";
const ObjectPage = lazy(() => import("./ObjectPage"));

const ObjectsRoutes = () => {
    return (
        <Routes>
            <Route index element={<ObjectPage />} />
        </Routes>
    );
};

export default ObjectsRoutes;
