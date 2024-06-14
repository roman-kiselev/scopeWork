import { Route, Routes } from "react-router";
import CreateProviderPage from "./CreateProviderPage";
import MainProvidersPage from "./MainProvidersPage";

const ProvidersRouter = () => {
    return (
        <Routes>
            <Route index element={<MainProvidersPage />} />
            <Route path="create/*" element={<CreateProviderPage />} />
        </Routes>
    );
};

export default ProvidersRouter;
