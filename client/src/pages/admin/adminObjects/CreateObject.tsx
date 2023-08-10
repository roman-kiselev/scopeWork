import { Divider, Form, List, Row, Skeleton } from 'antd'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CreateObjectFeatures } from '../../../features'

interface DataType {
    id: number;
    name: string;
    address: string;
}


const CreateObject = () => {
    const [form] = Form.useForm()
    const onFinish = (values: any) => {
        console.log(values)
    }

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<DataType[]>([
        {
            id: 1,
            name: 'ЖК Весна',
            address: 'г. Пенза ул. Пушкина д.43'
        },
        {
            id: 2,
            name: 'ЖК Весна',
            address: 'г. Пенза ул. Пушкина д.43'
        },
        {
            id: 3,
            name: 'ЖК Весна',
            address: 'г. Пенза ул. Пушкина д.43'
        },
        {
            id: 3,
            name: 'ЖК Весна',
            address: 'г. Пенза ул. Пушкина д.43'
        },
        {
            id: 3,
            name: 'ЖК Весна',
            address: 'г. Пенза ул. Пушкина д.43'
        },
        {
            id: 3,
            name: 'ЖК Весна',
            address: 'г. Пенза ул. Пушкина д.43'
        },
        {
            id: 3,
            name: 'ЖК Весна',
            address: 'г. Пенза ул. Пушкина д.43'
        },
        {
            id: 3,
            name: 'ЖК Весна',
            address: 'г. Пенза ул. Пушкина д.43'
        },
        {
            id: 3,
            name: 'ЖК Весна',
            address: 'г. Пенза ул. Пушкина д.43'
        },
        {
            id: 3,
            name: 'ЖК Весна',
            address: 'г. Пенза ул. Пушкина д.43'
        }
    ])

    return (
        <Row style={{ display: 'flex', flexDirection: 'column', margin: 10 }}>
            <h2>Создание объекта</h2>
            <Row style={{ display: 'flex', margin: 10 }}>
                <CreateObjectFeatures />
            </Row>
            <Row>
                <div
                    id='scrollableDiv'
                    style={{
                        height: '40vh',
                        width: '70vw',
                        overflow: 'auto',
                        padding: '0 16px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                        backgroundColor: 'white'
                    }}
                >
                    <InfiniteScroll
                        next={() => {
                        }}
                        dataLength={data.length}
                        hasMore={data.length < 2}
                        loader={
                            <Skeleton avatar paragraph={{ rows: 1 }} active />
                        }
                        endMessage={
                            <Divider plain>It is all, nothing more 🤐</Divider>
                        }
                        scrollableTarget='scrollableDiv'
                    >
                        <List
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item key={item.name}>
                                    <List.Item.Meta
                                        avatar={item.id}
                                        title={
                                            <a href='https://ant.design'>
                                                {item.name}
                                            </a>
                                        }
                                        description={item.address}
                                    />
                                    <div>
                                        <a href='https://ant.design'>
                                            К объекту
                                        </a>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>
            </Row>
        </Row>
    )
}

export default CreateObject
