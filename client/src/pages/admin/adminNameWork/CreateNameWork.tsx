import React from 'react'
import { Divider, Form, Row } from 'antd'
import { CreateNameWorkFeatures } from '../../../features'

const CreateNameWork = () => {

    const [form] = Form.useForm()


    const onFinish = (values: any) => {
        console.log(values)
    }

    const onReset = () => {
        form.resetFields()
    }

    const onFill = () => {
        form.setFieldsValue({ note: 'Hello world!', gender: 'male' })
    }

    return (
        <Row>
            <Row>

                {/* <Form

                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{width: "60vw"}}
                >
                    <Form.Item>
                        Создать наименование
                    </Form.Item>
                    <Form.Item name="note" label="Наименование" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="unit" label="Ед.изм." rules={[{required: true}]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={() => {
                            }}
                            allowClear
                            
                        >
                            <Select.Option value="Штуки">Штуки</Select.Option>
                            <Select.Option value="Метры">Метры</Select.Option>

                        </Select>
                    </Form.Item>
                    <Form.Item name="typeWork" label="Вид работ" rules={[{required: true}]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={() => {
                            }}
                            allowClear
                        >
                            <Select.Option value="АСКУЭ">АСКУЭ</Select.Option>
                            <Select.Option value="Водоснабжение">Водоснабжение</Select.Option>
                            <Select.Option value="Канализация">Канализация</Select.Option>
                            <Select.Option value="Другое">Другое</Select.Option>

                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Добавить
                        </Button>


                    </Form.Item>
                </Form

                >*/}
                <CreateNameWorkFeatures />
            </Row>
            <Divider />
        </Row>
    )
}

export default CreateNameWork
