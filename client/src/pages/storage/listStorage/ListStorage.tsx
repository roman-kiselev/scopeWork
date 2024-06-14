import { Col, Row, Space, Spin, Table, TableProps, Tag } from "antd";
import { Link } from "react-router-dom";
import { storageApi } from "src/shared/api";
import { IStorageAndUsersAndObjects } from "src/shared/interfaces";

// type T0<T> = T extends IStorageAndUsersAndObjects
//     ? IStorageAndUsersAndObjects
//     : { err: string };

interface DataType {
    key: string;
}

interface IStorageAndUsersAndObjectsForTable
    extends DataType,
        IStorageAndUsersAndObjects {}

const ListStorage = () => {
    const {
        data: listStorage,
        isSuccess,
        isError,
        isLoading,
    } = storageApi.useGetAllStorageQuery();
    console.log(listStorage);

    const columns: TableProps<IStorageAndUsersAndObjectsForTable>["columns"] = [
        {
            title: "Наименование",
            dataIndex: "name",
            key: "name",
            render: (_, { name }) => <a>{name}</a>,
        },
        {
            title: "Адрес",
            dataIndex: "address",
            key: "address",
            render: (_, { address }) => <a>{address}</a>,
        },
        {
            title: "Закреплён",
            key: "secured",
            dataIndex: "secured",
            render: (_, { objects }) => (
                <>
                    {objects.map(({ name, id }) => {
                        return (
                            <Tag color="green" key={id}>
                                {name}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: "Ответственный",
            key: "responsible",
            dataIndex: "responsible",
            render: (_, { users }) => (
                <>
                    {users.map(({ userDescription, id }) => {
                        return (
                            <Tag color="geekblue" key={id}>
                                {`${userDescription.firstname.toUpperCase()} ${userDescription.lastname.toUpperCase()}`}
                            </Tag>
                        );
                    })}
                </>
            ),
        },

        {
            title: "Действие",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/storage/${record.idStorage}`}>Перейти</Link>
                </Space>
            ),
        },
    ];
    if (isLoading) {
        return <Spin />;
    }
    // const data = (listStorage ?? []).map((item) => {
    //     return {
    //         ...item,
    //         key: item.idStorage.toString(),
    //     };
    // });

    const data =
        listStorage && listStorage !== undefined
            ? listStorage.map((item) => {
                  return {
                      key: item.idStorage.toString(),
                      ...item,
                  };
              })
            : [];

    return (
        <Row>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24}>
                <Table dataSource={data} columns={columns} />
            </Col>
        </Row>
    );
};

export default ListStorage;
