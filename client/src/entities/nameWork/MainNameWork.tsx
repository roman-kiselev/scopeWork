import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Popconfirm,
    Row,
    message,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useParams } from "react-router";
import { listNameWorkApi } from "../../shared/api";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import {
    resetForOneItem,
    resetSelectedData,
    setNameAndDescription,
} from "../../shared/models";

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
    // Сбрасываем в store

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(resetForOneItem());
        dispatch(resetSelectedData());
    }, [dispatch]);
    const { id } = useParams();

    const { data: dataById, isLoading: isLoadingQuery } =
        listNameWorkApi.useGetOneByIdQuery({
            id: Number(id) ? Number(id) : 0,
        });

    // Получаем состояние oneItem
    const { isLoading } = useAppSelector((store) => store.nameWorkList);
    const { idNumber, dateCreate, name, description } = useAppSelector(
        (store) => store.nameWorkList.oneItem
    );

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setNameAndDescription({ name: value }));
    };
    // const handleChangeDescription = (
    //     e: React.ChangeEvent<HTMLTextAreaElement>
    // ) => {
    //     const value = e.target.value;
    //     dispatch(setNameAndDescription({ description: value }));
    // };
    const handleChangeDescription = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        dispatch(setNameAndDescription({ description: value }));
    };

    if (isLoading) {
        return <h4>Loading...</h4>;
    }

    return (
        <Row style={{ display: "flex", flexDirection: "column" }}>
            <Form name="nest-messages" style={{ maxWidth: 600 }}>
                {idNumber && (
                    <Row>
                        <Row>
                            <Col style={{ margin: 10 }}>
                                <h3>Список № {idNumber}</h3>
                            </Col>
                            <Col style={{ margin: 10 }}>
                                <DatePicker
                                    defaultValue={dayjs(dateCreate, dateFormat)}
                                    disabled
                                />
                            </Col>
                        </Row>
                    </Row>
                )}

                <Row style={{ marginTop: 10 }}>
                    <Form.Item
                        initialValue={name ? name : ""}
                        name={"name"}
                        label="Наименование"
                    >
                        <Input
                            value={name}
                            onChange={(e) => handleChangeName(e)}
                        />
                    </Form.Item>
                </Row>
                <Form.Item
                    initialValue={description ? description : ""}
                    name={"description"}
                    label="Описание"
                >
                    {/* <Input.TextArea
                        value={description}
                        onChange={(e) => handleChangeDescription(e)}
                        showCount
                        maxLength={100}
                    /> */}
                    <Input
                        value={description}
                        onChange={(e) => handleChangeDescription(e)}
                    />
                </Form.Item>
                <Row>
                    {idNumber && (
                        <Col style={{ margin: 10 }}>
                            <Popconfirm
                                title="Удалить ед.измерения!"
                                description="Вы уверены что хотите удалить?"
                                onConfirm={(e) => confirm}
                                onCancel={(e) => cancel}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <Button danger>Удалить список</Button>
                            </Popconfirm>
                        </Col>
                    )}
                </Row>
            </Form>
        </Row>
    );
};

export default MainNameWork;
