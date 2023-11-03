import { Row } from "antd";
import { IOneScopeWorkWithData } from "../../../../shared/interfaces";
import OneFullScopeWork from "./OneFullScopeWork";

interface ListFullScopeWorkProps {
    objectData: IOneScopeWorkWithData[];
}

const ListFullScopeWork: React.FC<ListFullScopeWorkProps> = ({
    objectData,
}) => {
    return (
        <Row
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            {objectData?.map((item) => (
                <OneFullScopeWork key={item.id} scopeWork={item} />
            ))}
        </Row>
    );
};

export default ListFullScopeWork;
