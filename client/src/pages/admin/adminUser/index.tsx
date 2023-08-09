import React from "react";
import { Route, Routes } from "react-router";

const AdminUserRoutes = () => {
    return (
        <Routes>
            <Route index element={<h3>Список</h3>} />
            <Route path="create" element={<h3>Создать пользователя</h3>} />
        </Routes>
    );
};

export default AdminUserRoutes;
