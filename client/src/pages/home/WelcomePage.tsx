import { Button, Layout, Spin, Typography } from "antd";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useAppSelector } from "src/shared/hooks";
const { Title, Paragraph } = Typography;
const { Content } = Layout;

const WelcomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuth, token, isLoading } = useAppSelector((state) => state.auth);
    if (isLoading) {
        return <Spin />;
    }
    if (isAuth && token) {
        return (
            <Navigate
                to={location.state?.from || "/"}
                state={{ from: location }}
                replace={true}
            />
        );
    }

    return (
        <Layout
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Content
                style={{
                    maxHeight: "500px",
                    textAlign: "center",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                }}
            >
                <Title level={1}>Добро пожаловать в CRM систему!</Title>
                <Paragraph style={{ fontSize: "18px", marginBottom: "40px" }}>
                    Эффективное управление проектами для строительных
                    организаций.
                </Paragraph>
                <Button
                    type="primary"
                    size="large"
                    onClick={() => navigate("/login")}
                    style={{ marginRight: "20px" }}
                >
                    Войти
                </Button>
                <Button
                    type="default"
                    size="large"
                    onClick={() => navigate("/register")}
                >
                    Зарегистрировать организацию
                </Button>
            </Content>
        </Layout>
    );
};

export default WelcomePage;
