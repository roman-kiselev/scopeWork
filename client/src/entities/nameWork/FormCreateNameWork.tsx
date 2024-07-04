import { Button, Form, Input, Select } from "antd";
import React from "react";
import { ITypeWork, IUnit } from "../../shared/interfaces/models";

interface IFormCreateNameWork {
    form: any;
    onFinish: () => void;
    units: IUnit[] | [];
    typeWorkList: ITypeWork[] | [];
}

const FormCreateNameWork: React.FC<IFormCreateNameWork> = ({
    form,
    onFinish,
    units,
    typeWorkList,
}) => {
    return (
        <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ width: "60vw" }}
        >
            <Form.Item>Создать наименование</Form.Item>
            <Form.Item
                name="name"
                label="Наименование"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            {units && (
                <Form.Item
                    name="unitId"
                    label="Ед.изм."
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        {units.length > 0 ? (
                            units.map((unit) => (
                                <Select.Option
                                    key={unit.id}
                                    value={unit.id ?? ""}
                                >
                                    {unit.name}
                                </Select.Option>
                            ))
                        ) : (
                            <Select.Option>Данных нет</Select.Option>
                        )}
                    </Select>
                </Form.Item>
            )}

            {typeWorkList && (
                <Form.Item
                    name="typeWorkId"
                    label="Вид работ"
                    rules={[{ required: true }]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Please select"
                    >
                        {typeWorkList.length > 0 ? (
                            typeWorkList.map((type) => (
                                <Select.Option
                                    key={type.id}
                                    value={type.id ?? ""}
                                >
                                    {type.name}
                                </Select.Option>
                            ))
                        ) : (
                            <Select.Option>Данных нет</Select.Option>
                        )}
                    </Select>
                    {/* <Select
                        placeholder="Select a option and change input text above"
                        onChange={() => {}}
                        allowClear
                    >
                        {typeWorkList.length > 0 ? (
                            typeWorkList.map((type) => (
                                <Select.Option
                                    key={type.id}
                                    value={type.id ?? ""}
                                >
                                    {type.name}
                                </Select.Option>
                            ))
                        ) : (
                            <Select.Option>Данных нет</Select.Option>
                        )}
                    </Select> */}
                </Form.Item>
            )}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Добавить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormCreateNameWork;
