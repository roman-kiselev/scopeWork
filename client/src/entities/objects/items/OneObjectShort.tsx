import { List, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { IObjectCreateResponse } from "../../../shared/interfaces";

interface IOneObjectShortProps {
    object: IObjectCreateResponse;
}

const OneObjectShort: React.FC<IOneObjectShortProps> = ({ object }) => {
    return (
        <>
            <List.Item key={object.name}>
                <List.Item.Meta
                    avatar={object.id}
                    title={<a href="https://ant.design">{object.name}</a>}
                    description={object.address}
                />
                <Row>
                    <span>{object.createdAt.toString()}</span>
                </Row>
                <div>
                    <Link to={`/admin/object/${object.id}`}>К объекту</Link>
                </div>
            </List.Item>
        </>
    );
};

export default OneObjectShort;
