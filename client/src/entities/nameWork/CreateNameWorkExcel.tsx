import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useState } from "react";
import * as XLSX from "xlsx";
import { nameWorkApi } from "../../shared/api";

interface DataType {
    key?: string;
    __rowNum__: number;
    typeWork: string;
    name: string;
    unit: string;
    state?: string;
}

const handleQuery = async () => {
    const { data } = await axios(
        "https://speller.yandex.net/services/spellservice.json/checkText?text=синхрофaaaазотрон+в+дубне"
    );
};

type DataTypeForTable = Omit<DataType, "__rowNum__">;

const columns: ColumnsType<DataTypeForTable> = [
    {
        title: "Тип работ(typeWork)",
        dataIndex: "typeWork",
        key: "typeWork",
    },
    {
        title: "Наименование(name)",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Ед.изм(unit)",
        dataIndex: "unit",
        key: "unit",
    },
    {
        title: "Состояние",
        dataIndex: "state",
        key: "state",
    },
];

function ExportToExcel() {
    // Получим все наименования

    // Создаем новую книгу Excel
    const wb = XLSX.utils.book_new();

    // Создайте объект с данными для заполнения листа
    const data = [
        { typeWork: "Отопление(Пример)", name: "Труба(Пример)", unit: "шт" },
        { typeWork: "АСКУЭ(Пример)", name: "Труба(Пример)", unit: "шт" },
        {
            typeWork: "Водоснабжение(Пример)",
            name: "Труба(Пример)",
            unit: "шт",
        },
        { typeWork: "Канализация(Пример)", name: "Труба(Пример)", unit: "шт" },
        { typeWork: "Другое(Пример)", name: "Труба(Пример)", unit: "шт" },
    ];

    // Создаем лист с данными
    const ws = XLSX.utils.json_to_sheet(data);

    // Добавляем лист в книгу
    XLSX.utils.book_append_sheet(wb, ws, "Лист 1");
    // Функция для преобразования строки в массив байтов
    function s2ab(s: any) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    }
    // Создаем бинарные данные для скачивания

    const blob = new Blob(
        [s2ab(XLSX.write(wb, { bookType: "xlsx", type: "binary" }))],
        { type: "application/octet-stream" }
    );
    // Создаем URL для скачивания
    const url = URL.createObjectURL(blob);

    // Функция для обработки клика на кнопке "Скачать"
    const handleDownload = () => {
        const a = document.createElement("a");
        a.href = url;
        a.download = `Шаблон.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <Button type="primary" onClick={handleDownload}>
            Скачать шаблон Excel
        </Button>
    );
}
const CreateNameWorkExcel = () => {
    const [data, setData] = useState<DataType[] | []>([]);
    const [createNameWorkExcel, { isLoading, isSuccess, isError }] =
        nameWorkApi.useCreateArrMutation();
    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const excelData: DataType[] = XLSX.utils.sheet_to_json(sheet);
            setData(excelData);
            //console.log(excelData); // Вывод данных из Excel в консоль
        };
        reader.readAsBinaryString(file);
    };

    // const checkText = async (text: string) => {
    //     const finishText = text.trim().split(" ").join("+");
    //     console.log(finishText);
    //     let finishValue = false;
    //     const res = await axios(
    //         `https://speller.yandex.net/services/spellservice.json/checkText?text=${finishText}`
    //     ).then(({ data }) => {
    //         if (data.length !== 0) {
    //             finishValue = true;
    //         }
    //     });

    //     return finishValue;
    // };

    // const x = checkText("   Труба гибкая ПНД 16");
    // console.log(x); // TODO - Проверить орфографию

    const dataForTable: DataTypeForTable[] = data.map((item) => {
        return {
            name: item.name,
            typeWork: item.typeWork,
            unit: item.unit,
            key: item.__rowNum__.toString(),
            state: "",
        };
    });

    const createExcel = () => {
        createNameWorkExcel(dataForTable);
        setData([]);
    };

    return (
        <Row style={{ display: "flex", flexDirection: "column" }}>
            <Col>
                <Space>
                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileUpload}
                    />
                    {isLoading ? <Spin /> : null}
                    {isSuccess ? (
                        <CheckCircleOutlined
                            style={{ color: "green", fontSize: 30 }}
                        />
                    ) : null}
                    {isError ? (
                        <MinusCircleOutlined
                            style={{ color: "red", fontSize: 30 }}
                        />
                    ) : null}
                    <ExportToExcel />
                    <Button
                        onClick={() => createExcel()}
                        disabled={data.length === 0 ? true : false}
                    >
                        Создать
                    </Button>
                </Space>
            </Col>
            <Col style={{ marginTop: "10px" }}>
                <Table dataSource={dataForTable} columns={columns} />
            </Col>
        </Row>
    );
};

export default CreateNameWorkExcel;
