import React from "react";
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';



interface NewDataType {
    key: React.Key;
    name: string;
    unit: string;
    typeWork: string;
}

const newColumns: ColumnsType<NewDataType> = [
    {
        title: "Наименование",
        dataIndex: "name",
        filters: [
           {
            text: "Кран",
            value: "Кран"
           }
        ],
        filterSearch: true,
        onFilter: (value, record) => record.name.startsWith(value as string),
        width :"30%"
    },
    {
        title: "Ед.измерения",
        dataIndex: "unit",
        sortDirections: ['descend'],
        
    },
    {
        title: "Тип работ",
        dataIndex: "typeWork",
        filters: [
            {
                text: "АСКУЭ",
                value: "АСКУЭ"
            },
            {
                text: "Водоснабжение",
                value: "Водоснабжение"
            }
        ],
        onFilter: (value, record) => record.typeWork.startsWith(value as string),
        filterSearch: true,
        width: "40%"
    }
]

const newData: NewDataType[] = [
    {
        key: 1,
        name: "Краны",
        unit: "шт",
        typeWork: "Водоснабжение"
    },
    {
        key: 2,
        name: "Провода",
        unit: "м",
        typeWork: "АСКУЭ"

    }
] 


  const onChange: TableProps<NewDataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  
const Catalog = () => {
    return (
        <Table columns={newColumns} dataSource={newData} onChange={onChange} />
    )
};

export default Catalog;
