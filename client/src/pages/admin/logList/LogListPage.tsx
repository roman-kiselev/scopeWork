import { Col, Row, Space, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { ChangeEvent, useState } from "react";
import { tableAddingDataApi } from "../../../shared/api";
import { ILogList } from "../../../shared/interfaces";

interface ILogListPlusKey extends ILogList {
    key: string;
    index: number;
}

const columns: ColumnsType<ILogListPlusKey> = [
    {
        title: "№",
        dataIndex: "index",
        key: "index",
    },
    {
        title: "Дата",
        dataIndex: "createdAt",
        key: "createdAt",
    },
    {
        title: "Сообщение",
        dataIndex: "text",
        key: "text",
    },
];

const date = new Date();
const dateDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
const dateMonthFrom =
    date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`;
const dateMonthTo =
    date.getMonth() - 1 < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`;
const stringDateFrom = `${date.getFullYear()}-${dateMonthFrom}-${Number(
    dateDay
)}`;
const stringDateTo = `${date.getFullYear()}-${dateMonthTo}-${dateDay}`;

const LogListPage = () => {
    const [currentPage, setCurrentPage] = useState("1");
    const [limit, setLimit] = useState("10");
    const [dateFrom, setDateFrom] = useState<string>(stringDateFrom);
    const [dateTo, setDateTo] = useState<string>(stringDateTo);

    // useEffect(() => {
    //     setDateFrom(stringDateFrom);
    //     setDateTo(stringDateTo);
    // }, []);
    const { data, isLoading, isError } =
        tableAddingDataApi.useGetAllStringQuery({
            page: currentPage,
            limit: limit,
            dateFrom,
            dateTo,
        });

    const handleSetDateFrom = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDateFrom(value);
        tableAddingDataApi.endpoints.getAllString.initiate({
            page: currentPage,
            limit: limit,
            dateFrom: value,
            dateTo: dateTo,
        });
    };

    const handleSetDateTo = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDateTo(value);
        tableAddingDataApi.endpoints.getAllString.initiate({
            page: currentPage,
            limit: limit,
            dateFrom: dateFrom,
            dateTo: value,
        });
    };

    if (isLoading) {
        return <Spin />;
    }
    if (!data && isError) {
        return <h3>Возникла ошибка!</h3>;
    }

    const dataForTable = data?.rows.map((item, index) => {
        return {
            ...item,
            createdAt: item.createdAt.split("T")[0],
            key: item.id.toString(),
            index: (Number(currentPage) - 1) * Number(limit) + (index + 1),
        } as unknown as ILogListPlusKey;
    });

    return (
        <>
            <Row>
                <Space>
                    <Col>
                        <label style={{ marginRight: 10 }}>От:</label>
                        <input
                            style={{ marginBottom: "20px" }}
                            type="date"
                            name="trip-start"
                            defaultValue={dateFrom}
                            onChange={handleSetDateFrom}
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
                            onChange={handleSetDateTo}
                            defaultValue={dateTo}
                            // value="2018-07-22"
                            // min="2018-01-01"
                            // max="2018-12-31"
                        />
                    </Col>
                </Space>
            </Row>
            <Table
                pagination={{
                    total: data?.pagination.count,
                    onChange(page) {
                        setCurrentPage(page.toString());
                    },
                }}
                dataSource={dataForTable}
                columns={columns}
            />
        </>
    );
};

export default LogListPage;
