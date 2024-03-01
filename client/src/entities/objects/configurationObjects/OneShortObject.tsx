import { Alert, Card, Col, Progress, Row, Spin, Statistic } from "antd";
import { Link } from "react-router-dom";
import { typeWorkApi } from "../../../shared/api";
import { IOneObjectDataShort } from "../../../shared/interfaces";

const getCurrentDay = (createdAt: string) => {
    const currentDate = new Date();
    const dateCreate = new Date(createdAt);
    // Вычисляем разницу в миллисекундах
    const differenceInMilliseconds =
        currentDate.getTime() - dateCreate.getTime();

    // Переводим разницу в днях
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    return differenceInDays.toFixed();
};

const OneShortObject: React.FC<IOneObjectDataShort> = ({
    id,
    address,
    countTableAddingData,
    createdAt,
    dataObject,
    mainCount,
    name,
    percentAll,
}) => {
    const { data, isLoading } = typeWorkApi.useGetAllShortQuery();
    const getTypeName = (id: number) => {
        const findedTypeWork = data?.find((item) => item.id === id);
        if (findedTypeWork) {
            return findedTypeWork.name;
        }
    };
    if (isLoading) {
        return <Spin />;
    }

    return (
        <Card
            title={
                <Row style={{ display: "flex", flexDirection: "column" }}>
                    <Row>{name}</Row>
                    <Row>{address}</Row>
                </Row>
            }
            extra={<Link to={`/admin/object/${id}`}>К объекту</Link>}
            style={{ margin: 10 }}
        >
            <Row>
                <Col
                    style={{
                        display: "flex",
                        flexDirection: "column",

                        alignItems: "center",
                    }}
                >
                    <li>Общий прогресс</li>
                    <Progress type="circle" percent={Number(percentAll)} />
                    <Statistic
                        groupSeparator=""
                        title="Количество"
                        value={countTableAddingData.toFixed(2)}
                        suffix={`/${mainCount.toFixed(2)}`}
                    />
                </Col>

                {dataObject.map((scopeWork) => (
                    <Col
                        key={scopeWork.id}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: "0 20px",
                        }}
                    >
                        <li>{`Объём №${scopeWork.id}(${getTypeName(
                            scopeWork.typeWorkId
                        )})`}</li>

                        <Progress
                            type="circle"
                            percent={Number(scopeWork.percentAll)}
                        />
                        <Statistic
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                            groupSeparator=""
                            title="Количество"
                            value={scopeWork.countTableAddingData.toFixed(2)}
                            suffix={`/${scopeWork.mainCount.toFixed(2)}`}
                        />
                        <Statistic
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                            groupSeparator=""
                            title="В работе(дней)"
                            value={`${getCurrentDay(
                                scopeWork.createdAt.toString()
                            )}`}
                        />
                        {scopeWork.countTableAddingData >
                        scopeWork.mainCount ? (
                            <Alert
                                message={`Объём превышен на ${(
                                    Number(scopeWork.percentAll) - 100
                                ).toFixed(1)}%`}
                                type="warning"
                                showIcon
                            />
                        ) : null}
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default OneShortObject;
