import { Col, Input, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { scopeWorkApi } from "src/shared/api";
import { useAppSelector } from "src/shared/hooks";
import { IValueForListData } from "src/shared/interfaces";
import { IResQuickOneScopeWorkById } from "src/shared/interfaces/api";
import ColumnNameQuick from "./oneScopeWorkQuick/ColumnNameQuick";
import ColumnQuntityQuick from "./oneScopeWorkQuick/ColumnQuntityQuick";

const OneScopeWorkForEditQuick = () => {
    const { id: idScopeWork } = useParams();
    const { banned } = useAppSelector((store) => store.auth);
    const {
        data: scopeWorkDataQuick,
        isLoading,
        refetch,
    } = scopeWorkApi.useQuickOneScopeWorkByIdQuery({
        id: idScopeWork !== undefined && !banned ? idScopeWork.toString() : "0",
    });

    const [searchedText, setSearchedText] = useState("");

    const dataValue = scopeWorkDataQuick?.map((item) => {
        return {
            idNameWork: item.nameWorkId,
            listNameWorkId: item.listNameWorkId,
            value: "",
        } as IValueForListData;
    });

    const [dataList, setDataList] = useState<IValueForListData[]>(
        dataValue || []
    );

    useEffect(() => {
        const dataValue = scopeWorkDataQuick?.map((item) => {
            return {
                idNameWork: item.nameWorkId,
                value: "",
                listNameWorkId: item.listNameWorkId,
            } as IValueForListData;
        });
        setDataList(dataValue || []);
    }, [idScopeWork, scopeWorkDataQuick]);

    if (isLoading) {
        return <Spin />;
    }

    const dataForTable = scopeWorkDataQuick?.map((item, index) => {
        return {
            ...item,
            key: (index + 1).toString(),
            index: (index + 1).toString(),
        };
    });

    const columns: ColumnsType<IResQuickOneScopeWorkById> = [
        {
            title: "",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Наименование",
            dataIndex: "name",
            key: "name",
            filteredValue: [searchedText],
            onFilter: (value: any, record: any) => {
                return String(record.name)
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
            render: (
                _: any,
                {
                    id,
                    name,
                    nameWorkId,
                    percent,
                    quntityMain,
                    remainderQuntity,
                    unitName,
                    unitId,
                }
            ) => (
                <ColumnNameQuick
                    isLoading={isLoading}
                    name={name}
                    nameListId={id}
                    nameWorkId={nameWorkId}
                    percent={percent ? percent : 0}
                    scopeWorkId={idScopeWork ? +idScopeWork : 0}
                    refetch={refetch}
                    remainderQuntity={
                        remainderQuntity !== null
                            ? remainderQuntity
                            : quntityMain || 0
                    }
                    unitId={unitId}
                    unitName={unitName}
                />

                // <ColumnName
                //     count={quntityMain}
                //     name={name}
                //     percent={percent}
                //     quntity={quntity}
                //     unitId={unitId}
                //     isLoading={isLoading}
                //     nameListId={nameListId}
                //     nameWorkId={nameWorkId}
                //     scopeWorkId={scopeWorkId}
                //     refetch={refetch}
                // />
            ),
        },
        {
            title: "Количество",
            dataIndex: "quntity",
            key: "quntity",
            render: (_: any, { id, nameWorkId, listNameWorkId }) => (
                <ColumnQuntityQuick
                    nameListId={id}
                    data={dataList}
                    listNameWorkId={listNameWorkId}
                    scopeWorkId={idScopeWork?.toString() || "0"}
                    nameWorkId={nameWorkId}
                    refetch={refetch}
                    setDataList={setDataList}
                />
                // <ColumnQuntity
                //     dataList={dataList}
                //     listNameWorkId={listNameWorkId}
                //     nameListId={nameListId}
                //     nameWorkId={nameWorkId}
                //     scopeWorkId={scopeWorkId}
                //     setDataList={setDataList}
                //     refetch={refetch}
                // />
            ),
        },
    ];

    return (
        <Col>
            <Col style={{ maxWidth: "300px" }}>
                <Input.Search
                    placeholder="Поиск ..."
                    style={{ margin: "10px 0" }}
                    onSearch={(value) => {
                        setSearchedText(value);
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchedText(e.target.value);
                    }}
                />
            </Col>

            <Table size="small" dataSource={dataForTable} columns={columns} />
        </Col>
    );
};

export default OneScopeWorkForEditQuick;
