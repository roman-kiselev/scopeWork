import { lazy } from "react";
import { Route, Routes } from "react-router";
import { SuspenseLoad } from "../entities";
import { SuspenseLoadCheckAR, SuspenseLoadCheckR } from "../features";
import { RoleString } from "../shared/config";
import NoAccess from "./noAccess";
import ScopeWorkAddData from "./scopeWork/ScopeWorkAddData";

const LoginPage = lazy(() => import("./auth/LoginPage"));
const RegisterPage = lazy(() => import("./auth/RegisterPage"));
const HomePage = lazy(() => import("./home/HomePage"));
const LayoutPage = lazy(() => import("./home/LayoutPage"));
const ObjectsRoutes = lazy(() => import("./objects/index"));
const AdminRoutes = lazy(() => import("./admin/index"));
const OrdersRouter = lazy(() => import("./orders/index"));
const StorageRouter = lazy(() => import("./storage/index"));
const ProvidersRouter = lazy(() => import("./providers/index"));

const Routing = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <SuspenseLoadCheckAR
                        roles={[RoleString.USER, RoleString.ADMIN]}
                    >
                        <LayoutPage />
                    </SuspenseLoadCheckAR>
                }
            >
                <Route index element={<HomePage />} />
                <Route path="/:id" element={<ScopeWorkAddData />} />
                {/* <Route
                    path="objects/*"
                    element={
                        <SuspenseLoadCheckR
                            roles={[
                                RoleString.USER,
                                RoleString.ADMIN,
                                RoleString.DEV,
                            ]}
                        >
                            <ObjectsRoutes />
                        </SuspenseLoadCheckR>
                    }
                /> */}

                <Route
                    path="orders/*"
                    element={
                        <SuspenseLoadCheckR
                            roles={[
                                RoleString.USER,
                                RoleString.ADMIN,
                                RoleString.MASTER,
                            ]}
                        >
                            <OrdersRouter />
                        </SuspenseLoadCheckR>
                    }
                />

                <Route
                    path="storage/*"
                    element={
                        <SuspenseLoadCheckR
                            roles={[
                                RoleString.MASTER,
                                RoleString.ADMIN,
                                RoleString.MANAGER,
                            ]}
                        >
                            <StorageRouter />
                        </SuspenseLoadCheckR>
                    }
                />
                <Route
                    path="providers/*"
                    element={
                        <SuspenseLoadCheckR
                            roles={[
                                RoleString.MASTER,
                                RoleString.ADMIN,
                                RoleString.MANAGER,
                            ]}
                        >
                            <ProvidersRouter />
                        </SuspenseLoadCheckR>
                    }
                />

                <Route
                    path="admin/*"
                    element={
                        <SuspenseLoadCheckR
                            roles={[RoleString.ADMIN, RoleString.DEV]}
                        >
                            <AdminRoutes />
                        </SuspenseLoadCheckR>
                    }
                />
            </Route>
            <Route
                path="/login"
                element={
                    <SuspenseLoad>
                        <LoginPage />
                    </SuspenseLoad>
                }
            />
            <Route
                path="/register"
                element={
                    <SuspenseLoad>
                        <RegisterPage />
                    </SuspenseLoad>
                }
            />
            <Route path="*" element={<NoAccess />} />
        </Routes>
    );
};

export default Routing;
