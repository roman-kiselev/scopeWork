import { Row } from "antd";
import { OneObjectFull } from "../../../entities";

const OneObjectConfig = () => {
    return (
        <Row style={{ display: "flex", flexDirection: "column" }}>
            <OneObjectFull />
        </Row>
    );
};

export default OneObjectConfig;
