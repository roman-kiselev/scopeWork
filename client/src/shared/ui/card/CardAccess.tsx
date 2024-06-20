import { Card, Col, Divider, Space } from "antd";
import { CardSize } from "antd/es/card/Card";
import React from "react";
import { Link } from "react-router-dom";

interface ILinkCardAccess {
    to: string;
    title: string;
    dataRoles: string[];
    accessRoles: string[];
}

interface ILinkCardAccessConfig extends Omit<ILinkCardAccess, "dataRoles"> {}

interface ILinkCardAccessArr {
    data: ILinkCardAccessConfig[];
    dataRoles: string[];
}

interface ICardAccessProps {
    size?: CardSize;
    titleCard: string;
    links: ILinkCardAccessConfig[];
    description: string;
    dataRoles: string[];
    accessRoles?: string[];
}

const checkRole = (
    currentRoles: string[],
    accessRoles: string[] | undefined
) => {
    let stateRole = false;
    if (!accessRoles) {
        return true;
    }
    currentRoles.forEach((item) => {
        const findedIndex = accessRoles.findIndex((role) => role === item);
        if (findedIndex !== -1) {
            stateRole = true;
        }
    });

    return stateRole;
};

const OneLinkAccess: React.FC<ILinkCardAccess> = ({
    dataRoles,
    accessRoles,
    title,
    to,
}) => {
    return (
        <>
            {checkRole(dataRoles, accessRoles) ? (
                <>
                    <Link to={to}>{title}</Link>
                    <Divider type="vertical" style={{ color: "black" }} />
                </>
            ) : null}
        </>
    );
};

const ManyLinkAccess: React.FC<ILinkCardAccessArr> = ({ data, dataRoles }) => {
    return (
        <>
            {data.map((link, index) => (
                <OneLinkAccess
                    key={index}
                    dataRoles={dataRoles}
                    accessRoles={link.accessRoles}
                    title={link.title}
                    to={link.to}
                />
            ))}
        </>
    );
};

const CardAccess: React.FC<ICardAccessProps> = ({
    size = "small",
    ...props
}) => {
    return (
        <>
            {checkRole(props.dataRoles, props.accessRoles) ? (
                <Col>
                    <Card
                        size={size}
                        title={props.titleCard}
                        extra={
                            <Space>
                                <ManyLinkAccess
                                    data={props.links}
                                    dataRoles={props.dataRoles}
                                />
                            </Space>
                        }
                        style={{ width: 300 }}
                    >
                        <p>{props.description}</p>
                    </Card>
                </Col>
            ) : null}
        </>
    );
};

export default CardAccess;
