import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Col } from "antd";
import { Link } from "react-router-dom";
import { CreateAndEditListNameWork } from "../../../../features";
const CreateListNameWork = () => {
    return (
        <Col>
            <Col
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
                                    <Link to="/admin/object/list/">
                                        Главная (Объёмы)
                                    </Link>
                                </>
                            ),
                        },
                        {
                            title: "Создание списка",
                        },
                    ]}
                />
            </Col>
            <Col>
                <CreateAndEditListNameWork />
            </Col>
        </Col>
    );
};

export default CreateListNameWork;
