import { Navigate } from "react-router";
import ScopeWorkForHome from "src/entities/scopeWorkForHome/ScopeWorkForHome";
import { RoleString } from "src/shared/config";
import { useAppSelector } from "src/shared/hooks";

const HomePage = () => {
    const roles = useAppSelector((store) => store.auth.roles);

    // if (roles.includes(RoleString.ADMIN) || roles.includes(RoleString.MASTER)) {
    //     // return <Navigate to="/" />;

    // }
    if (roles.includes(RoleString.WAREHOUSEMAN)) {
        return <Navigate to="/warehouseman" />;
    }
    if (roles.includes(RoleString.MANAGER)) {
        return <h3>Страница менеджера</h3>;
    }
    if (roles.includes(RoleString.DRIVER)) {
        return <h3>Страница водителя</h3>;
    }

    return <ScopeWorkForHome />;
};

export default HomePage;
