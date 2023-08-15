import React from 'react'
import { Button, Form, Input, Select } from 'antd'
import { IUnit } from '../../shared/interfaces/models'


interface IFormCreateNameWork {
    form: any;
    onFinish: () => void;
    units: IUnit[],

}


const FormCreateNameWork: React.FC<IFormCreateNameWork> = ({ form, onFinish, units }) => {
    return (
        <Form

            form={form}
            name='control-hooks'
            onFinish={onFinish}
            style={{ width: '60vw' }}
        >
            <Form.Item>
                Создать наименование
            </Form.Item>
            <Form.Item name='note' label='Наименование' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name='unit' label='Ед.изм.' rules={[{ required: true }]}>
                <Select
                    placeholder='Select a option and change input text above'
                    onChange={() => {
                    }}
                    allowClear
                >
                    {
                        units.map((unit) => (
                            <Select.Option value={unit.id}>{unit.name}</Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>
            <Form.Item name='typeWork' label='Вид работ' rules={[{ required: true }]}>
                <Select
                    placeholder='Select a option and change input text above'
                    onChange={() => {
                    }}
                    allowClear
                >
                    <Select.Option value='АСКУЭ'>АСКУЭ</Select.Option>
                    <Select.Option value='Водоснабжение'>Водоснабжение</Select.Option>
                    <Select.Option value='Канализация'>Канализация</Select.Option>
                    <Select.Option value='Другое'>Другое</Select.Option>

                </Select>
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Добавить
                </Button>


            </Form.Item>
        </Form>
    )
}

export default FormCreateNameWork