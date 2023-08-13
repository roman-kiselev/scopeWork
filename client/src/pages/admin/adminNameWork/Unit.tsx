import React from "react";
import {Button, Divider, Form, Input, Row} from "antd";
import {IUnit} from "../../../shared/interfaces/models";
import {SimpleShortItemForList, SimpleShortList} from "../../../entities";

const data: IUnit[] = [
    {
        id: 1,
        name: "шт",
        description: "Штуки",
        createdAt: new Date(),
        updatedAt: new Date()
    }
];


const Unit = () => {

    const [form] = Form.useForm();


    const onFinish = (values: any) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue({note: 'Hello world!', gender: 'male'});
    };

    return (
        <Row>
            <Row>

                <Form

                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{width: "60vw"}}
                >
                    <Form.Item>
                        Создать еденицу измерения
                    </Form.Item>
                    <Form.Item name="shortName" label="Короткое название" rules={[{required: true}]}>
                        <Input placeholder={"шт м мм км"}/>
                    </Form.Item>
                    <Form.Item name="description" label="Описание" rules={[{required: true}]}>
                        <Input placeholder={"Штуки, метры, миллиметры, километры"}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Добавить
                        </Button>


                    </Form.Item>
                </Form

                >
            </Row>
            <Divider/>
            <Row>
                <SimpleShortList title={"Список"}>
                    {
                        data.map((unit, index) => (
                            <SimpleShortItemForList key={unit.id} index={index} id={unit.id} name={unit.name}
                                                    description={unit.description}/>
                        ))
                    }

                </SimpleShortList>
            </Row>
        </Row>
    );
};

export default Unit;
