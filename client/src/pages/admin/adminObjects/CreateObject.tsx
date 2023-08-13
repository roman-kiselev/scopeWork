import {Row} from 'antd'
import React from 'react'
import {CreateObjectFeatures, ListInfiniteShortFeatures} from '../../../features'


const CreateObject = () => {

    return (
        <Row style={{display: 'flex', flexDirection: 'column', margin: 10}}>
            <h2>Создание объекта</h2>
            <Row style={{display: 'flex', margin: 10}}>
                <CreateObjectFeatures/>
            </Row>
            <Row>
                <div
                    id='scrollableDiv'
                    style={{
                        height: '40vh',
                        width: '70vw',
                        overflow: 'auto',
                        padding: '0 16px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                        backgroundColor: 'white'
                    }}
                >
                    <ListInfiniteShortFeatures/>
                </div>
            </Row>
        </Row>
    )
}

export default CreateObject
