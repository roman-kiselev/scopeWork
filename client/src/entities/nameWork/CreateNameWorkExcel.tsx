import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Row, Upload } from "antd";

const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const CreateNameWorkExcel = () => {
    const handleFileUpload = () => {
        console.log("Началась загрузка");
    };

    return (
        <Row>
            <Form onFinish={handleFileUpload}>
                <Form.Item
                    name="upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
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
            </Form>
        </Row>
    );
};

export default CreateNameWorkExcel;
