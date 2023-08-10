import React from 'react'
import { FormCreateObject } from '../../entities'
import { useForm } from 'antd/es/form/Form'

const CreateObject = () => {
    const form = useForm()

    return (
        <FormCreateObject form={form} onFinish={() => {
        }} />
    )
}

export default CreateObject