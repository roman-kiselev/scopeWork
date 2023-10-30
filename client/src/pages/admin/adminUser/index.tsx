import { Route, Routes } from "react-router";
import CreateUser from "./CreateUser";
import ListUser from "./ListUser";
import OneUser from "./OneUser";

const AdminUserRoutes = () => {
    return (
        <Routes>
            <Route index element={<ListUser />} />
            <Route path="/:id" element={<OneUser />} />
            <Route path="create" element={<CreateUser />} />
        </Routes>
    );
};

export default AdminUserRoutes;
