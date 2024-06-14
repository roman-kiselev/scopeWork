import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Form, Row, message } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storageApi } from "src/shared/api";
import { CreateStorage } from "src/shared/ui";

// { name: "Кантри", address: "г. Пенза", object: 1, responsibleUser: 1 }
// ​
// address: "г. Пенза"
// ​
// name: "Кантри"
// ​
// object: 1
// ​
// responsibleUser: 1
interface IFormStorage {
    name: string;
    address: string;
    object: number;
    responsibleUser: number;
}

const CreateStoragePage = () => {
    const [form] = useForm<IFormStorage>();

    const [messageApi, contextHolder] = message.useMessage();
    const name: string = Form.useWatch("name", { form, preserve: true });
    const [nameEdit, setNameEdit] = useState<string>("");
    const {
        data: dataCheck,
        isError: isErrorCheck,
        isSuccess: isSuccessCheck,
        isLoading: isLoadingCheck,
        refetch,
    } = storageApi.useCheckNameQuery(
        { nameStorage: nameEdit },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        let timeoutId: any;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            setNameEdit(name);
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [name]);
    const data: IFormStorage = useWatch([], form);
    // console.log(data);
    const [createStorage, { data: dataStorage, isSuccess, isError }] =
        storageApi.useCreateStorageMutation();

    const onFinish = () => {
        // createStorage({
        //     name: data,
        // });
        createStorage({
            name: data.name,
            address: data.address,
            objectId: data.object,
            userId: data.responsibleUser,
        });
    };
    // if (isSuccess) {
    //     form.resetFields();
    // }

    return (
        <Row>
            {contextHolder}
            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Row
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Breadcrumb
                        items={[
                            {
                                title: (
                                    <>
                                        <HomeOutlined />
                                        <Link to="/">Домой</Link>
                                    </>
                                ),
                            },
                            {
                                title: (
                                    <>
                                        <Link to="/storage">
                                            Главная (Склад)
                                        </Link>
                                    </>
                                ),
                            },
                            {
                                title: "Создание (Склад)",
                            },
                        ]}
                    />
                </Row>
            </Col>
            <Row>
                <CreateStorage
                    form={form}
                    onFinish={onFinish}
                    isSuccessCreate={isSuccess}
                    isError={isError}
                    isStorage={
                        dataCheck !== undefined && dataCheck.statusCode === 200
                            ? false
                            : true
                    }
                    dataCheck={dataCheck ? dataCheck : null}
                    isErrorCheck={isErrorCheck}
                    name={nameEdit}
                    isLoadingCheck={isLoadingCheck}
                />
            </Row>
        </Row>
    );
};

export default CreateStoragePage;
