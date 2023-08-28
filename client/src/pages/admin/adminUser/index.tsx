import { Route, Routes } from "react-router";
import CreateUser from "./CreateUser";
import ListUser from "./ListUser";

const AdminUserRoutes = () => {
    return (
        <Routes>
            <Route index element={<ListUser />} />
            <Route path="create" element={<CreateUser />} />
        </Routes>
    );
};

export default AdminUserRoutes;
