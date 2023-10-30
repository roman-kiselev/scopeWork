import { Button, Modal, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, { useState } from "react";
import { EditNameWorkFeatures } from "../../../features";
import { nameWorkApi } from "../../../shared/api";
import { useAppSelector } from "../../../shared/hooks";
import { INameWorkCreateResponse } from "../../../shared/interfaces";

interface NameWorkWithKey {
    key: React.Key;
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: boolean | null;
    unit: string;
    typeWorks: string[];
}

const onChange: TableProps<NameWorkWithKey>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
) => {
    // console.log("params", pagination, filters, sorter, extra);
};

const getData = (data: INameWorkCreateResponse[]) => {
    const d: NameWorkWithKey[] = [];
    const newData = data.map((name) => {
        const { name: unitName } = name.unit;
        const { typeWorks } = name;
        let stringTypeWork: string[] = [];
        if (typeWorks !== null) {
            for (let i = 0; i < typeWorks.length; i++) {
                stringTypeWork.push(typeWorks[i].name);
            }
        }

        let nameWork: NameWorkWithKey = {
            key: name.id,
            id: name.id,
            name: name.name,
            createdAt: name.createdAt,
            updatedAt: name.updatedAt,
            deletedAt: name.deletedAt,
            unit: unitName,
            // typeWorks: stringTypeWork.join(","),
            typeWorks: stringTypeWork,
        };

        d.push(nameWork);
    });

    return d;
};

interface ModalEditProps {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    data: NameWorkWithKey | null;
}

const ModalEdit: React.FC<ModalEditProps> = ({
    handleCancel,
    handleOk,
    isModalOpen,
    data,
}) => {
    if (data === null) {
        return <></>;
    }
    return (
        <Modal
            title="Редактирование"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <EditNameWorkFeatures
                selectedName={data.name}
                selectedTypeWork={data.typeWorks}
                selectedUnit={data.unit}
            />
            {/* <p>{data.id}</p>
            <p>{data.name}</p>
            <p>{data.typeWorks}</p> */}
        </Modal>
    );
};

const Catalog = () => {
    const { isSuccess, data, isLoading } = nameWorkApi.useGetAllNameWorkQuery();
    const { listNameWork } = useAppSelector((store) => store.nameWork);
    const dataNameWork: NameWorkWithKey[] = getData(listNameWork);
    const [selectedData, setSelectedData] = useState<NameWorkWithKey | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (record: any) => {
        setSelectedData(record);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setSelectedData(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedData(null);
    };

    const newColumns: ColumnsType<NameWorkWithKey> = [
        {
            title: "Наименование",
            dataIndex: "name",
            filters: [
                {
                    text: "Кран",
                    value: "Кран",
                },
            ],
            filterSearch: true,
            onFilter: (value, record) =>
                record.name.startsWith(value as string),
            width: "30%",
        },
        {
            title: "Ед.измерения",
            dataIndex: "unit",
            sortDirections: ["descend"],
        },
        {
            title: "Тип работ",
            dataIndex: "typeWorks",
            filters: [
                {
                    text: "АСКУЭ",
                    value: "АСКУЭ",
                },
                {
                    text: "Водоснабжение",
                    value: "Водоснабжение",
                },
            ],
            // onFilter: (value, record) => (
            //     record.typeWorks.startsWith(value as string),
            // ),

            filterSearch: true,
            width: "40%",
        },
        {
            title: "Действия",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <Button onClick={() => showModal(record)}>
                        Редактировать
                    </Button>
                );
            },
        },
    ];

    return (
        <>
            <Table
                columns={newColumns}
                dataSource={dataNameWork}
                onChange={onChange}
            />
            <ModalEdit
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                data={selectedData}
            />
        </>
    );
};

export default Catalog;
