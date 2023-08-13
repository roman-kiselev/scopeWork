import React from 'react';
import {List, Row} from "antd";
import {IObjectCreateResponse} from "../../../shared/interfaces";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

interface IOneObjectShortProps {
    object: IObjectCreateResponse
}


const OneObjectShort: React.FC<IOneObjectShortProps> = ({object}) => {
    const navigate = useNavigate()


    return (
        <>
            <List.Item key={object.name}>
                <List.Item.Meta
                    avatar={object.id}
                    title={
                        <a href='https://ant.design'>
                            {object.name}
                        </a>
                    }
                    description={object.address}
                />
                <Row>
                    <span>{object.createdAt.toString()}</span>
                </Row>
                <div>
                    <Link to={`/admin/object/${object.id}`}>
                        К объекту
                    </Link>

                </div>
            </List.Item>
        </>
    );
};

export default OneObjectShort;