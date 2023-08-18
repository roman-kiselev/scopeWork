import React from 'react'
import FormCreateNameWork from '../../entities/nameWork/FormCreateNameWork'
import { useForm, useWatch } from 'antd/es/form/Form'
import { useAppSelector } from '../../shared/hooks'
import { unitsApi } from '../../shared/api'

const CreateNameWorkFeatures = () => {
    const [form] = useForm()
    const data = useWatch([], form)
    const { data: dataUnit } = unitsApi.useGetAllUnitsQuery()
    const onFinish = () => {
    }
    const { listUnits } = useAppSelector((state) => state.unit)
    return (
        <FormCreateNameWork form={form} onFinish={onFinish} units={listUnits} />
    )
}

export default CreateNameWorkFeatures