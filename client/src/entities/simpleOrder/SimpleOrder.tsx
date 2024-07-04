import { Button, Card, Col, Row, SelectProps, Spin } from "antd";
import { useState } from "react";
import { objectsApi, scopeWorkApi, userApi } from "src/shared/api";
import { useAppDispatch, useAppSelector } from "src/shared/hooks";
import { SelectObject } from "src/shared/ui";

const SimpleOrder = () => {
    const { id } = useAppSelector((store) => store.auth);
    const dispatch = useAppDispatch();
    const { data: dataObject } = objectsApi.useGetAllObjectShortQuery();
    const [, setSelectedObject] = useState<string>("");
    const [, setSelectedScopeWork] = useState<string>("");
    const [, setSelectedToUser] = useState<string>("");

    // const dataCreateOrder = {
    //     userId: id,
    //     objectId: selectedObject,
    //     scopeWorkId: selectedScopeWork,
    // };

    const { isLoading } = userApi.useGetAllUsersQuery();
    if (isLoading) <Spin />;

    const [stateScopeWork, setStateScopeWork] = useState<
        SelectProps["options"]
    >([{ value: "0", label: "Выберите объём" }]);
    const optionObject: SelectProps["options"] =
        dataObject !== undefined
            ? dataObject.map(({ id, name }) => {
                  return {
                      label: name,
                      value: id,
                  };
              })
            : [];
    const optionFinishObject: SelectProps["options"] = [
        {
            label: "Выберите объект",
            value: "0",
        },
        ...optionObject,
    ];
    const handleCnageObject = async (value: string) => {
        setSelectedObject(value);
        try {
            const data = await dispatch(
                scopeWorkApi.endpoints.getScopeWorkByUserAndObject.initiate({
                    userId: id ? id.toString() : "0",
                    objectId: value,
                })
            ).unwrap();

            const options: SelectProps["options"] = data.map(
                ({ id, name, nameTypeWork }) => {
                    return {
                        value: id,
                        label: `${name} ${nameTypeWork}`,
                    };
                }
            );
            setStateScopeWork(options);
        } catch (e) {
            console.log(e);
        }
    };

    //

    return (
        <Col
            style={{
                margin: 10,
                width: "100%",
            }}
            sm={24}
            md={24}
            lg={11}
            xl={11}
            xxl={11}
        >
            <Card
                title="Произвольный заказ"
                bordered={false}
                style={{
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <Row
                    style={{
                        marginBottom: 10,
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <SelectObject
                        handleChange={handleCnageObject}
                        options={optionFinishObject}
                        defaultValue="Выберите объект"
                        disabled={false}
                    />
                </Row>
                <Row
                    style={{
                        marginBottom: 10,
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <SelectObject
                        handleChange={() => setSelectedScopeWork}
                        options={stateScopeWork}
                        defaultValue="Выберите объём"
                        disabled={false}
                    />
                </Row>
                <Row
                    style={{
                        marginBottom: 10,
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <SelectObject
                        handleChange={() => setSelectedToUser}
                        options={optionFinishObject}
                        defaultValue="Выберите склад"
                        disabled={false}
                    />
                </Row>
                <Row
                    style={{
                        marginBottom: 10,
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <SelectObject
                        handleChange={() => setSelectedToUser}
                        options={optionFinishObject}
                        defaultValue="Выберите пользователя"
                        disabled={false}
                    />
                </Row>
                <Row
                    style={{
                        marginBottom: 10,
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <Button type="primary">Далее</Button>
                </Row>
            </Card>
        </Col>
    );
};

export default SimpleOrder;
