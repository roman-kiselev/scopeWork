import { Route, Routes } from "react-router";
import CreateListNameWork from "./CreateListNameWork";
import HomeNameWork from "./HomeNameWork";

const NameWorkRouter = () => {
    return (
        <>
            <Routes>
                <Route index element={<HomeNameWork />} />
                <Route path="addNewList" element={<CreateListNameWork />} />
            </Routes>
        </>
    );
};

export default NameWorkRouter;
