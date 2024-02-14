import { Progress, Row, Space, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RoleString } from "src/shared/config";
import { ButtonExcelWithParams, ModalDownloadScopework } from "src/shared/ui";
import { checkRole } from "src/shared/utils";
import { scopeWorkApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

interface DataType {
    key: string;
    number: string;
    typeWork: string;
    object: string;
    progress: string;
    action: string;
}

// const columns: ColumnsType<DataType> = [
//     {
//         title: "№",
//         dataIndex: "number",
//         key: "number",
//         render: (num) => (
//             <>
//                 <Space>
//                     <Link to={`/${num}`}>{num}</Link>
//                     <ButtonExcel handleClick={handleClickShowModal} />
//                 </Space>
//             </>
//         ),
//         responsive: ["sm", "lg", "md", "xl", "xs"],
//     },
//     {
//         title: "Тип работ",
//         dataIndex: "typeWork",
//         key: "typeWork",
//         responsive: ["sm", "lg", "md", "xl", "xs"],
//         render: (_: any, { typeWork, number }) => (
//             <Link to={`/${number}`}>{typeWork}</Link>
//         ),
//     },
//     {
//         title: "Объект",
//         dataIndex: "object",
//         key: "object",
//         responsive: ["sm", "lg", "md", "xl", "xs"],
//     },
//     {
//         title: "Прогресс",
//         dataIndex: "progress",
//         key: "progress",
//         responsive: ["lg"],
//         render: (_: any, { progress }) => (
//             <>
//                 {progress !== undefined && Number(progress) > 100 ? (
//                     <Progress
//                         percent={Number(progress)}
//                         strokeColor="yellow"
//                         status={"success"}
//                     />
//                 ) : (
//                     <Progress
//                         percent={Number(progress)}
//                         status={
//                             progress === undefined || Number(progress) < 100
//                                 ? "active"
//                                 : "success"
//                         }
//                     />
//                 )}
//             </>
//         ),
//     },
//     {
//         title: "Действие",
//         key: "action",
//         render: (_: any, { number }) => (
//             <Space size="middle">
//                 <Link to={`/${number}`}>Перейти</Link>
//             </Space>
//         ),
//         responsive: ["lg"],
//     },
// ];

const ScopeWorkForHome = () => {
    const { id, banned, roles } = useAppSelector((store) => store.auth);
    const [selectedId, setSelectedId] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const { data, isLoading, isError } = scopeWorkApi.useGetShortSqlQuery({
        id: id !== null ? id.toString() : "",
    });
    // if (id) {
    //     const { data } = scopeWorkApi.useGetAllScopeWorkByUserIdQuery({
    //         id: id,
    //     });
    //     console.log(data);
    // }
    // const { scopeWorkData, isLoading } = useAppSelector(
    //     (store) => store.dataOneUser
    // );
    // // Подсчитаем прогресс

    // const dataForTable = scopeWorkData.map((scopeWork) => {
    //     const { object, typeWork, id, percent } = scopeWork;
    //     return {
    //         key: id ?? "",
    //         number: id ?? "",
    //         action: id ?? "",
    //         progress: percent,
    //         object: object?.name,
    //         typeWork: typeWork?.name,
    //     } as DataType;
    // });

    const handleClickShowModal = (id: string) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleCancelModal = () => {
        setOpen(false);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "№",
            dataIndex: "number",
            key: "number",
            render: (num) => (
                <>
                    <Link to={`/${num}`}>{num}</Link>
                </>
            ),
            responsive: ["sm", "lg", "md", "xl", "xs"],
        },
        {
            title: "Тип работ",
            dataIndex: "typeWork",
            key: "typeWork",
            responsive: ["sm", "lg", "md", "xl", "xs"],
            render: (_: any, { typeWork, number }) => (
                <Space>
                    <Link to={`/${number}`}>{typeWork}</Link>
                    {checkRole(roles, RoleString.ADMIN) && (
                        <ButtonExcelWithParams
                            id={number}
                            handleClick={handleClickShowModal}
                        />
                    )}
                </Space>
            ),
        },
        {
            title: "Объект",
            dataIndex: "object",
            key: "object",
            responsive: ["sm", "lg", "md", "xl", "xs"],
        },
        {
            title: "Прогресс",
            dataIndex: "progress",
            key: "progress",
            responsive: ["lg"],
            render: (_: any, { progress }) => (
                <>
                    {progress !== undefined && Number(progress) > 100 ? (
                        <Progress
                            percent={Number(progress)}
                            strokeColor="yellow"
                            status={"success"}
                        />
                    ) : (
                        <Progress
                            percent={Number(progress)}
                            status={
                                progress === undefined || Number(progress) < 100
                                    ? "active"
                                    : "success"
                            }
                        />
                    )}
                </>
            ),
        },
        {
            title: "Действие",
            key: "action",
            render: (_: any, { number }) => (
                <Space size="middle">
                    <Link to={`/${number}`}>Перейти</Link>
                </Space>
            ),
            responsive: ["lg"],
        },
    ];

    const dataForTable = data?.map((item) => ({
        key: item.id.toString() ?? "",
        number: item.id.toString() ?? "",
        action: item.id.toString() ?? "",
        progress: item.percent !== null ? item.percent.toString() : "0",
        object: item.nameObject.toString(),
        typeWork: item.nameTypework.toString(),
    }));

    if (isLoading) {
        return <Spin />;
    }

    if (banned) {
        return <p>Нет доступа</p>;
    }
    return (
        <>
            <Row>
                <ModalDownloadScopework
                    idScopeWork={selectedId}
                    handleCancel={handleCancelModal}
                    open={open}
                />
            </Row>
            <Row style={{ marginBottom: 10 }}>
                <h2>Доступные работы</h2>
            </Row>
            <Table size="small" columns={columns} dataSource={dataForTable} />
        </>
    );
};

export default ScopeWorkForHome;
