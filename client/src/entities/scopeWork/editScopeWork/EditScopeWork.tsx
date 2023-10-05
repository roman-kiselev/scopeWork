import { Row } from "antd";
import BodyEditScopeWork from "./BodyEditScopeWork";
import SelectedData from "./SelectedData";

const EditScopeWork = () => {
    // const { isLoading } = useAppSelector((store) => store.scopeWork);
    // if (isLoading) {
    //     return <Spin />;
    // }

    return (
        <>
            <Row
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                }}
            >
                <SelectedData />
            </Row>
            <Row>
                <BodyEditScopeWork />
            </Row>
        </>
    );
};

export default EditScopeWork;
