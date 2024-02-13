import { FileExcelOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface IButtonExcel {
    handleClick: () => void;
}

const ButtonExcel: React.FC<IButtonExcel> = ({ handleClick }) => {
    return (
        <>
            <Button
                onClick={handleClick}
                shape="circle"
                style={{ backgroundColor: "greenyellow" }}
            >
                <FileExcelOutlined />
            </Button>
        </>
    );
};

export default ButtonExcel;
