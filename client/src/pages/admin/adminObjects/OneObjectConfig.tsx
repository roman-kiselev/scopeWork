import React, {useState} from 'react';
import {Button, Card, Col, Divider, Input, Modal, Row, Select, Space} from "antd";

const OneObjectConfig = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const [isModalOpenScope, setIsModalOpenScope] = useState<boolean>(false)
    const showModalScope = () => {
        setIsModalOpenScope(true)
    }
    const handleOkScope = () => {
        setIsModalOpenScope(false)
    }
    const handleCancelScope = () => {
        setIsModalOpenScope(false)
    }

    return (
        <Row style={{display: "flex", flexDirection: "column"}}>
            <Row>
                <h2>ЖК Зеландия</h2>
            </Row>
            <Divider/>
            <Row style={{display: "flex", flexDirection: "column", margin: 10}}>
                <Row>
                    Типы работ
                </Row>
                <Row style={{marginTop: 20}}>
                    <Space>
                        <Col>
                            <Button type="primary" onClick={showModal}>
                                Создать тип
                            </Button>
                        </Col>
                        <Col>
                            <Select
                                defaultValue="lucy"
                                style={{width: 120}}
                                onChange={() => {
                                }}
                                options={[
                                    {value: 'АСКУЭ', label: 'АСКУЭ'},
                                    {value: 'Водоснабжение', label: 'Водоснабжение'},
                                    {value: 'Yiminghe', label: 'yiminghe'},
                                    {value: 'disabled', label: 'Disabled', disabled: true},
                                ]}
                            />
                        </Col>
                        <Col>
                            <Button type="primary" onClick={() => {
                            }}>
                                Добавить тип
                            </Button>
                        </Col>
                    </Space>
                    <Modal title="Создание типа работ" confirmLoading={true} open={isModalOpen} onOk={handleOk}
                           onCancel={handleCancel}>

                        <Input placeholder="Введите наименование"/>

                    </Modal>
                </Row>
                <Row>

                    <Row style={{margin: 10, flexDirection: "row", flexBasis: "100%"}}>
                        <Card
                            type="inner"
                            style={{width: "95%"}}
                            title="АСКУЭ"
                        >
                            <Button type="primary" onClick={showModalScope}>
                                Добавить объём
                            </Button>
                            <Modal title="Добавить объём" confirmLoading={true} open={isModalOpenScope}
                                   onOk={handleOkScope}
                                   onCancel={handleCancelScope}>

                                <Input placeholder="Введите наименование"/>

                            </Modal>
                        </Card>
                    </Row>


                </Row>
            </Row>
            <Divider/>
        </Row>
    )
        ;
};

export default OneObjectConfig;