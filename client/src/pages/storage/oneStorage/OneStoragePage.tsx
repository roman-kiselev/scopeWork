import { Row, Spin } from "antd";
import { useParams } from "react-router";
import { StorageDescriptionShort } from "src/entities";

const OneStoragePage = () => {
    const { id } = useParams();

    return (
        <Row>
            <Row>
                {/* Изменять может только admin */}
                {id ? <StorageDescriptionShort idStorage={+id} /> : <Spin />}
            </Row>
        </Row>
    );
};

export default OneStoragePage;
