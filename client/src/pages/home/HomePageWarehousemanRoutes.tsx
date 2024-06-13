import { Route, Routes } from "react-router";
import CheckOrderReceipt from "src/entities/storage/orderReceipt/CheckOrderReceipt";
import HomepageWarehouseman from "./HomepageWarehouseman";

const HomePageWarehousemanRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomepageWarehouseman />} />
            <Route path="/:id" element={<CheckOrderReceipt />} />
        </Routes>
    );
};

export default HomePageWarehousemanRoutes;
