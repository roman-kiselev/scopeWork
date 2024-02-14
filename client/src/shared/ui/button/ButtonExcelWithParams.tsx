import { FileExcelOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface IButtonExcel {
    id: string;
    handleClick: (id: string) => void;
}

const ButtonExcelWithParams: React.FC<IButtonExcel> = ({ id, handleClick }) => {
    return (
        <>
            <Button
                onClick={() => handleClick(id)}
                shape="circle"
                style={{ backgroundColor: "greenyellow" }}
            >
                <FileExcelOutlined />
            </Button>
        </>
    );
};

export default ButtonExcelWithParams;
