import { Route, Routes } from "react-router";
import AllListNameWork from "./AllListNameWork";
import CreateListNameWork from "./CreateListNameWork";
import HomeNameWork from "./HomeNameWork";
import OneItemNameWork from "./OneItemNameWork";

const NameWorkRouter = () => {
    return (
        <>
            <Routes>
                <Route index element={<HomeNameWork />} />
                <Route path="addNewList" element={<CreateListNameWork />} />
                <Route path="listItem" element={<AllListNameWork />} />
                <Route path="listItem/:id" element={<OneItemNameWork />} />
            </Routes>
        </>
    );
};

export default NameWorkRouter;
