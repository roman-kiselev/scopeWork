import React from 'react'
import { Divider, Form, Row } from 'antd'
import { IUnit } from '../../../shared/interfaces/models'
import { CreateUnitForm, ListUnits } from '../../../features'

const data: IUnit[] = [
    {
        id: 1,
        name: 'шт',
        description: 'Штуки',
        createdAt: new Date(),
        updatedAt: new Date()
    }
]


const Unit = () => {

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
                <CreateUnitForm />
            </Row>
            <Divider />
            <Row>
                <ListUnits />
            </Row>
        </Row>
    )
}

export default Unit
