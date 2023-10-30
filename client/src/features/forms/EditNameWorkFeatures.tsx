import { Button, Form, Input, Select } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { typeWorkApi, unitsApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

interface EditNameWorkFeaturesProps {
    selectedName: string;
    selectedUnit: string;
    selectedTypeWork: string[];
}

const EditNameWorkFeatures: React.FC<EditNameWorkFeaturesProps> = ({
    selectedName,
    selectedTypeWork,
    selectedUnit,
}) => {
    const [form] = useForm();
    const data = useWatch([], form);
    const { data: dataUnit } = unitsApi.useGetAllUnitsQuery();
    const { data: dataType } = typeWorkApi.useGetAllTypeWorkQuery();

    const onFinish = async () => {
        console.log(data);
    };
    const { listUnits } = useAppSelector((state) => state.unit);
    const { listTypeWork } = useAppSelector((state) => state.typeWork);

    const findedDataUnit = dataUnit?.find((item) => item.name === selectedUnit);
    const arrFindedTypeWork = [];
    if (dataType) {
        for (let i = 0; i < selectedTypeWork.length; i++) {
            const findedTypeWork = dataType.find(
                (item) => item.name === selectedTypeWork[i]
            );
            arrFindedTypeWork.push(findedTypeWork);
        }
    }
    const arrFindedTypeWorkId = arrFindedTypeWork.map((item) => item?.id);

    return (
        <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ width: "40vw" }}
        >
            {/* <Form.Item>Редактирование наименования</Form.Item> */}
            <Form.Item
                name="name"
                label="Наименование"
                rules={[{ required: true }]}
                initialValue={selectedName}
                style={{ width: "80%" }}
            >
                <Input />
            </Form.Item>
            {listUnits && (
                <Form.Item
                    name="unitId"
                    label="Ед.изм."
                    rules={[{ required: true }]}
                    initialValue={findedDataUnit?.id}
                    style={{ width: "80%" }}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        onChange={() => {}}
                        allowClear
                    >
                        {listUnits.length > 0 ? (
                            listUnits.map((unit) => (
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

            {listTypeWork && (
                <Form.Item
                    name="typeWorkId"
                    label="Вид работ"
                    rules={[{ required: true }]}
                    initialValue={arrFindedTypeWorkId}
                    style={{ width: "80%" }}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Please select"
                    >
                        {listTypeWork.length > 0 ? (
                            listTypeWork.map((type) => (
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
                        defaultValue={2}
                    >
                        {listTypeWork.length > 0 ? (
                            listTypeWork.map((type) => (
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
                    Изменить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditNameWorkFeatures;
