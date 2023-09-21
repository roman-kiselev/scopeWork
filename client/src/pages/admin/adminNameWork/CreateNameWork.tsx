import { Divider, Row } from "antd";
import { CreateNameWorkExcel } from "../../../entities";
import { CreateNameWorkFeatures } from "../../../features";

const CreateNameWork = () => {
    return (
        <Row>
            <Divider />
            <Row>
                <CreateNameWorkFeatures />
            </Row>
            <Divider />
            <CreateNameWorkExcel />
            <Divider />
        </Row>
    );
};

export default CreateNameWork;
