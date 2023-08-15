import React from 'react'
import { Button, Form, Input } from 'antd'

interface IFormUnit {
    form: any;
    onFinish: () => void;
}


const FormUnit: React.FC<IFormUnit> = ({ form, onFinish }) => {
    return (
        <Form

            form={form}
            name='control-hooks'
            onFinish={onFinish}
            style={{ width: '60vw' }}
        >
            <Form.Item>
                Создать еденицу измерения
            </Form.Item>
            <Form.Item name='name' label='Короткое название' rules={[{ required: true }]}>
                <Input placeholder={'шт м мм км'} />
            </Form.Item>
            <Form.Item name='description' label='Описание' rules={[{ required: true }]}>
                <Input placeholder={'Штуки, метры, миллиметры, километры'} />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Добавить
                </Button>


            </Form.Item>
        </Form>
    )
}

export default FormUnit