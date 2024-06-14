import { Route, Routes } from "react-router";
import CreateOrder from "./CreateOrder";
import MainOrdersPage from "./MainOrdersPage";

const OrdersRouter = () => {
    return (
        <Routes>
            <Route index element={<MainOrdersPage />} />
            <Route path="/create/*" element={<CreateOrder />} />
        </Routes>
    );
};

export default OrdersRouter;
