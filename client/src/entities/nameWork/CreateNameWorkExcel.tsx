import { Row, Spin } from "antd";
import * as XLSX from "xlsx";

const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const CreateNameWorkExcel = () => {
    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const excelData = XLSX.utils.sheet_to_json(sheet);
            console.log(excelData); // Вывод данных из Excel в консоль
        };
        reader.readAsBinaryString(file);
    };

    return (
        <Row>
            {/* <Form onFinish={handleFinish}>
                <Form.Item
                    name="upload"
                    valuePropName="fileList"
                    getValueFromEvent={() => {}}
                >
                    <Upload
                        beforeUpload={() => false}
                        name="logo"
                        listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>
                            Выберите excel файл
                        </Button>
                    </Upload>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Отправить
                </Button>
            </Form> */}
            <Row>
                <input type="file" accept=".xlsx" onChange={handleFileUpload} />
                <Spin />
            </Row>
        </Row>
    );
};

export default CreateNameWorkExcel;
