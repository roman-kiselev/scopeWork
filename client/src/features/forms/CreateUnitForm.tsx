import React from 'react'
import { useForm, useWatch } from 'antd/es/form/Form'
import { FormUnit } from '../../entities'
import { unitsApi } from '../../shared/api'

const CreateUnitForm = () => {
    const [form] = useForm()
    const data = useWatch([], form)
    const [createUnit, { isSuccess }] = unitsApi.useCreateUnitMutation()
    const finish = async () => {
        const res = await createUnit(data)
    }

    return (
        <FormUnit form={form} onFinish={finish} />
    )
}

export default CreateUnitForm