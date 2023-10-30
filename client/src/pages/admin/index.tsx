import { lazy } from "react";
import { Route, Routes } from "react-router";

const UsersRouter = lazy(() => import("./adminUser"));
const ObjectsRouter = lazy(() => import("./adminObjects"));
const NameWorkRouter = lazy(() => import("./adminNameWork"));
const LogListPage = lazy(() => import("./logList/LogListPage"));
const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="users/*" element={<UsersRouter />} />
            <Route path="object/*" element={<ObjectsRouter />} />
            <Route path="nomenclature/*" element={<NameWorkRouter />} />
            <Route path="logList" element={<LogListPage />} />
        </Routes>
    );
};

export default AdminRoutes;
