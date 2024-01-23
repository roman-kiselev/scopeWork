import { Button, Col, Form, Input, Row, Spin, Switch } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { useParams } from "react-router";
import { authApi, userApi } from "../../../shared/api";
import { useAppSelector } from "../../../shared/hooks";
import { MultiSelectRoles } from "../../../shared/ui";

interface OneUserFormProps {
    userId: string;
}

const OneUserForm: React.FC<OneUserFormProps> = ({ userId }) => {
    const { id } = useParams();
    const [form] = useForm();
    const dataForm = useWatch([], form);

    const { data, isLoading, isSuccess, isError } = userApi.useGetOneUserQuery({
        id: userId,
    });
    const [
        editUser,
        { data: dataEdit, isSuccess: isSuccessEdit, isLoading: isLoadingEdit },
    ] = authApi.useEditMutation();

    const {
        oneUserWithDescription,
        isLoading: isLoadingStore,
        isError: isErrorStore,
    } = useAppSelector((store) => store.users);

    if (isLoading || isLoadingStore) {
        return <Spin />;
    }

    // console.log(data?.banned);
    // const [switchItem, setSwitchItem] = useState(data?.banned);

    // const { email, password, userDescription, banned } = data ?? {};
    // const { firstname, lastname } = userDescription ?? {};
    // const [user, setUser] = useState<IEditUserDto>({
    //     firstname: firstname ?? "",
    //     lastname: lastname ?? "",
    //     banned: banned ?? false,
    //     email: data?.email,
    //     password: "",
    //     userId: userId,
    // });

    // console.log(user);
    // // useEffect(() => {
    // //     setSwitchItem(banned);
    // // }, []);
    // if (isLoading) {
    //     return <Spin />;
    // }

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const handleFinish = (dataValue: any) => {
        console.log(dataValue);
    };
    const handleSave = (dataForm: any, userId: any) => {
        editUser({ ...dataForm, userId });
    };
    return (
        <>
            <Form name="formUser" form={form} layout="inline">
                <Row style={{ display: "flex", flexDirection: "column" }}>
                    <Row>
                        <Col>
                            <Form.Item
                                style={{ margin: 10 }}
                                label="Имя"
                                initialValue={data?.userDescription.firstname}
                                name="firstname"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                style={{ margin: 10 }}
                                label="Фамилия"
                                initialValue={data?.userDescription.lastname}
                                name="lastname"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                name="email"
                                style={{ margin: 10 }}
                                label="Почта"
                                initialValue={data?.email}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                style={{ margin: 10 }}
                                label="Новый пароль"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ margin: 10 }}>
                        <MultiSelectRoles />
                    </Row>
                    <Row style={{ margin: 10 }}>
                        <Form.Item
                            label={
                                data?.banned
                                    ? "Разблокировать"
                                    : "Заблокировать"
                            }
                            valuePropName="checked"
                            initialValue={data?.banned}
                            name="banned"
                        >
                            <Switch
                            // defaultChecked={data?.banned}
                            />
                        </Form.Item>
                    </Row>
                    <Row style={{ margin: 10 }}>
                        {dataForm !== null ? (
                            <Button
                                onClick={() => handleSave(dataForm, userId)}
                                type="primary"
                            >
                                Сохранить
                            </Button>
                        ) : null}
                    </Row>
                </Row>
            </Form>
        </>
    );
};

export default OneUserForm;
