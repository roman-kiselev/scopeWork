import { Form, Input, Row, Typography, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { setNameAndDescription } from "../../shared/models";
const { TextArea } = Input;
const { Text, Title } = Typography;

const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
    console.log("Change:", e.target.value);
};
const dateFormat = "YYYY-MM-DD";
const d = new Date();
const getNumWithZero = (n: number) => {
    let newN: string;
    if (n < 10) {
        newN = `0${n}`;
        return newN;
    }
    return n;
};
const nowDate = `${d.getFullYear()}-${getNumWithZero(
    d.getMonth()
)}-${getNumWithZero(d.getDate())}`;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success("Click on Yes");
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
};
const MainNameWork = () => {
    const dispatch = useAppDispatch();
    const { name, description } = useAppSelector(
        (store) => store.nameWorkList.oneItem
    );

    const data = { name, description };
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setNameAndDescription({ name: value }));
    };
    const handleChangeDescription = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const value = e.target.value;
        dispatch(setNameAndDescription({ description: value }));
    };
    return (
        <Row style={{ display: "flex", flexDirection: "column" }}>
            <Form
                name="nest-messages"
                onFinish={() => {}}
                style={{ maxWidth: 600 }}
            >
                {/* Нет у новых списков */}
                {/* <Row>
                    <Row>
                        <Col style={{ margin: 10 }}>
                            <h3>Список № 1</h3>
                        </Col>
                        <Col style={{ margin: 10 }}>
                            <DatePicker
                                defaultValue={dayjs(nowDate, dateFormat)}
                                disabled
                            />
                        </Col>
                    </Row>
                </Row> */}
                <Row style={{ marginTop: 10 }}>
                    <Form.Item name={"name"} label="Наименование">
                        <Input
                            value={name}
                            onChange={(e) => handleChangeName(e)}
                        />
                    </Form.Item>
                </Row>
                <Form.Item name={"description"} label="Описание (100 символов)">
                    <Input.TextArea
                        value={description}
                        onChange={(e) => handleChangeDescription(e)}
                        showCount
                        maxLength={100}
                    />
                </Form.Item>
                <Row>
                    {/* <Col style={{ margin: 10 }}>
                        <Button type="primary" htmlType="submit">
                            Создать
                        </Button>
                    </Col> */}
                    {/* <Col style={{ margin: 10 }}>
                        <Popconfirm
                            title="Удалить ед.измерения!"
                            description="Вы уверены что хотите удалить?"
                            onConfirm={(e) => confirm}
                            onCancel={(e) => cancel}
                            okText="Да"
                            cancelText="Нет"
                        >
                            <Button danger>Удалить</Button>
                        </Popconfirm>
                    </Col> */}
                </Row>
            </Form>
        </Row>
    );
};

export default MainNameWork;
