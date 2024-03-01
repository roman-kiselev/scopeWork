import { Route, Routes } from "react-router";
import CreateStoragePage from "./CreateStoragePage";
import MainStoragePage from "./MainStoragePage";

const StorageRouter = () => {
    return (
        <Routes>
            <Route index element={<MainStoragePage />} />
            <Route path="/create/*" element={<CreateStoragePage />} />
            <Route path="/listStorage/*" element={<p>List Storage</p>} />
        </Routes>
    );
};

export default StorageRouter;
