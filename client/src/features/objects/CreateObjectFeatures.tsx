import React from 'react'
import {FormCreateObject} from '../../entities'
import {useForm, useWatch} from 'antd/es/form/Form'
import {objectsApi} from "../../shared/api";
import {useAppSelector} from "../../shared/hooks";

const CreateObjectFeatures = () => {
    const [form] = useForm()
    const data = useWatch([], form)
    const {listObject} = useAppSelector((state) => state.objects)

    const [createObject, {isSuccess}] = objectsApi.useCreateMutation()

    const onFinish = async () => {
        const res = await createObject(data)
    }

    return (
        <FormCreateObject form={form} onFinish={onFinish}/>
    )
}

export default CreateObjectFeatures