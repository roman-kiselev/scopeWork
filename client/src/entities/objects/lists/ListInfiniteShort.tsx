import React from 'react';
import {Divider, List, Skeleton} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {IObjectCreateResponse} from "../../../shared/interfaces";

interface IListInfiniteShortProps {
    data: IObjectCreateResponse[],
    children: React.ReactNode
}


const ListInfiniteShort: React.FC<IListInfiniteShortProps> = ({data, children}) => {
    return (
        <InfiniteScroll
            next={() => {
            }}
            dataLength={data.length}
            hasMore={data.length < 2}
            loader={
                <Skeleton avatar paragraph={{rows: 1}} active/>
            }
            endMessage={
                <Divider plain>It is all, nothing more 🤐</Divider>
            }
            scrollableTarget='scrollableDiv'
        >
            <List>
                {children}
            </List>
        </InfiniteScroll>
    );
};

export default ListInfiniteShort;