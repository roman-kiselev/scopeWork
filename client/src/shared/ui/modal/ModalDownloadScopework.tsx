import { Button, Col, Modal, Row, Space } from "antd";
import React, { useState } from "react";
import { getDate } from "src/shared/utils/Get";

interface IModalDownloadScopework {
    open: boolean;
    handleCancel: () => void;
    idScopeWork: string;
}

const ModalDownloadScopework: React.FC<IModalDownloadScopework> = ({
    open,
    handleCancel,
    idScopeWork,
}) => {
    const date = new Date();

    const [dateFrom, setDateFrom] = useState<string>(getDate(date));
    const [dateTo, setDateTo] = useState<string>(getDate(date));

    const handleClick = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_URL_API}/scope-work/getHistory/${idScopeWork}?dateFrom=${dateFrom} 00.00.00&dateTo=${dateTo} 23.59.59`
            );
            if (!response.ok) {
                throw new Error("Ошибка при загрузке файла");
            }

            const blob = await response.blob();

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `Объём работ.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Ошибка при загрузке файла:", error);
        }
    };

    return (
        <Modal
            open={open}
            title="Выбор временного промежутка"
            onOk={() => {}}
            onCancel={handleCancel}
            footer={<></>}
        >
            <Space>
                <Row>
                    <Col sm={24} xl={24} md={24}>
                        <Col>
                            <label style={{ marginRight: 10 }}>От:</label>
                            <input
                                style={{ marginBottom: "20px" }}
                                type="date"
                                name="trip-start"
                                defaultValue={dateFrom}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setDateFrom(e.target.value)}
                                // value={}
                                // min="2018-01-01"
                                // max="2018-12-31"
                            />
                        </Col>
                        <Col>
                            <label style={{ marginRight: 10 }}>до:</label>
                            <input
                                style={{ marginBottom: "20px" }}
                                type="date"
                                name="trip-start"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setDateTo(e.target.value)}
                                defaultValue={dateTo}
                                // value="2018-07-22"
                                // min="2018-01-01"
                                // max="2018-12-31"
                            />
                        </Col>
                    </Col>

                    <Col>
                        <Button onClick={() => handleClick()}>
                            Получить файл
                        </Button>
                    </Col>
                </Row>
            </Space>
        </Modal>
    );
};

export default ModalDownloadScopework;
