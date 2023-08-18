import React from 'react'
import { Divider, Row } from 'antd'
import { CreateUnitForm, ListUnits } from '../../../features'


const Unit = () => {


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
