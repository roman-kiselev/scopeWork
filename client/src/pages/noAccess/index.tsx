import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router";

const NoAccess = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate(-1);
    };

    return (
        <Result
            title="У вас нет доступа или ссылка не существует"
            extra={
                <Button type="primary" key="console" onClick={goHome}>
                    Вернуться назад
                </Button>
            }
        />
    );
};

export default NoAccess;
