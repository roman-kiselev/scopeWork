import React from 'react'
import { Button, Form, Input } from 'antd'

interface IFormCreateObject {
    form: any;
    onFinish: () => void
}

const FormCreateObject: React.FC<IFormCreateObject> = ({ form, onFinish }) => {
    return (
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
    )
}

export default FormCreateObject