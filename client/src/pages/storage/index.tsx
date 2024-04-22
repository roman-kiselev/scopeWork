import { Route, Routes } from "react-router";
import CreateStoragePage from "./CreateStoragePage";
import MainStoragePage from "./MainStoragePage";
import { ListStorage } from "./listStorage";
import { OneStoragePage } from "./oneStorage";
import { OrderReceiptPage } from "./orderReceipt";

const StorageRouter = () => {
    return (
        <Routes>
            <Route index element={<MainStoragePage />} />
            <Route path="/:id/*" element={<OneStoragePage />} />
            <Route path="/create/*" element={<CreateStoragePage />} />
            <Route path="/listStorage/*" element={<ListStorage />} />
            <Route
                path="/add-name-in-storage/*"
                element={<OrderReceiptPage />}
            />
        </Routes>
    );
};

export default StorageRouter;
