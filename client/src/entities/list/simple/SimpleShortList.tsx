import React from 'react';
import {List} from "antd";

interface ISimpleShortList {
    title: string;
    // data: IUnit[];
    children: React.ReactNode;
}


const SimpleShortList: React.FC<ISimpleShortList> = ({title, children}) => {
    return (
        <List
            size="small"
            header={<div>{title}</div>}
            style={{width: "80vw"}}
            bordered
        >
            {children}
        </List>
    );
};

export default SimpleShortList;