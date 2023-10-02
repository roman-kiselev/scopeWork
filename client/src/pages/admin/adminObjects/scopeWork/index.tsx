import { Route, Routes } from "react-router";
import HomeScopeWork from "./HomeScopeWork";
import CreateScopeWorkPage from "./createScopeWork/CreateScopeWorkPage";

const ScopeWorkRouter = () => {
    return (
        <>
            <Routes>
                <Route index element={<HomeScopeWork />} />
                <Route
                    path="addNewScopeWork"
                    element={<CreateScopeWorkPage />}
                />
                {/* <Route path="listItem" element={<AllListNameWork />} />
                <Route path="listItem/:id" element={<OneItemNameWork />} /> */}
            </Routes>
        </>
    );
};

export default ScopeWorkRouter;
