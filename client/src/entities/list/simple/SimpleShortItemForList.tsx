import { Button, Col, List, message, Popconfirm, Row } from "antd";
import React from "react";

interface ISimpleShortItemForList {
    index: number;
    id: number;
    name?: string;
    description?: string;
    firstName?: string;
    lastName?: string;
}

const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success("Click on Yes");
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
};

const SimpleShortItemForList: React.FC<ISimpleShortItemForList> = ({
    id,
    index,
    name,
    description,
    firstName,
    lastName,
}) => {
    return (
        <>
            <List.Item>
                <Row
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        flexBasis: "100%",
                    }}
                >
                    <Col style={{ display: "flex" }}>
                        {index + 1}. {description ? description : null} (
                        {name ? name : null}) {firstName ? firstName : null}{" "}
                        {lastName ? lastName : null}
                    </Col>
                    <Col style={{ display: "flex" }}>
                        <Popconfirm
                            title="Удалить ед.измерения!"
                            description="Вы уверены что хотите удалить?"
                            onConfirm={(e) => confirm}
                            onCancel={(e) => cancel}
                            okText="Да"
                            cancelText="Нет"
                        >
                            <Button danger>Удалить</Button>
                        </Popconfirm>
                    </Col>
                </Row>
            </List.Item>
        </>
    );
};

export default SimpleShortItemForList;
