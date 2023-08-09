import { Button, Divider, Form, Input, List, Row, Skeleton } from 'antd'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

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
                <Form
                    form={form}
                    name='control-hooks'
                    onFinish={onFinish}
                    style={{ width: '70vw' }}
                >
                    <Form.Item
                        name='name'
                        label='Наименование объекта'
                        rules={[
                            {
                                required: true,
                                message: 'Наименование обязательное поле'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='address'
                        label='Адрес объекта'
                        rules={[
                            {
                                required: true,
                                message: 'Адрес обязательное поле'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Создать
                        </Button>
                    </Form.Item>
                </Form>
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
