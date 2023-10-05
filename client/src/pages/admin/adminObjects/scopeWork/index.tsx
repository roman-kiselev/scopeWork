import { Route, Routes } from "react-router";
import { ListScopeWork } from "../../../../entities";
import HomeScopeWork from "./HomeScopeWork";
import CreateScopeWorkPage from "./createScopeWork/CreateScopeWorkPage";
import EditScopeWorkPage from "./editScopeWork/EditScopeWorkPage";

const ScopeWorkRouter = () => {
    return (
        <>
            <Routes>
                <Route index element={<HomeScopeWork />} />
                <Route
                    path="addNewScopeWork"
                    element={<CreateScopeWorkPage />}
                />
                <Route path="listScopeWork" element={<ListScopeWork />} />
                <Route
                    path="listScopeWork/:id"
                    element={<EditScopeWorkPage />}
                />

                {/* <Route path="listItem" element={<AllListNameWork />} />
                <Route path="listItem/:id" element={<OneItemNameWork />} /> */}
            </Routes>
        </>
    );
};

export default ScopeWorkRouter;
