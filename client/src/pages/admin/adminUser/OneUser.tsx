import { Row, Spin } from "antd";
import { useParams } from "react-router";
import { OneUserForm } from "../../../entities";

const OneUser = () => {
    const { id } = useParams();
    if (!id) {
        return <Spin />;
    }

    return (
        <Row>
            <OneUserForm userId={id} />
        </Row>
    );
};

export default OneUser;
