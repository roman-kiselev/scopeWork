import { InboxOutlined } from "@ant-design/icons";
import { Form, Row, Upload } from "antd";

const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const CreateNameWorkExcel = () => {
    return (
        <Row>
            <Form.Item label="Загрузить файл">
                <Form.Item
                    name="dragger"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                >
                    <Upload.Dragger name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Выберите или перенесите файл Excel
                        </p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
        </Row>
    );
};

export default CreateNameWorkExcel;
