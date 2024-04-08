import { Col, Row } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { useState } from "react";
import { CreateProvider, CreateTransportCompany } from "src/entities";
import { transportCompanyApi } from "src/shared/api";
import { EmptyModal } from "src/shared/ui";

const ProviderFeatures = () => {
    const [stateModal, setStateModal] = useState<boolean>(false);
    const [formTk] = useForm();
    const dataFormTk = useWatch([], formTk);
    const {
        data: dataTransportCompany,
        isSuccess: isSuccessTransportCompany,
        isError: isErrorTransportCompany,
        isLoading: isLoadingTransportCompany,
        refetch: refetchTransportCompany,
    } = transportCompanyApi.useGetAllQuery();

    const [
        createTransportCompany,
        {
            data: dataCreateTk,
            isLoading: isLoadingCreateTk,
            isError: isErrorCreateTk,
            isSuccess: isSuccessCreateTk,
        },
    ] = transportCompanyApi.useCreateMutation();

    const createTransportCompanyOpen = () => {
        setStateModal(true);
    };
    const handleCancel = () => {
        setStateModal(false);
    };
    const handleFinish = () => {
        createTransportCompany(dataFormTk);
    };
    if (isSuccessCreateTk) {
        formTk.resetFields();
        refetchTransportCompany();
    }

    return (
        <Row>
            <EmptyModal
                handleCancel={handleCancel}
                open={stateModal}
                title="Создание ТК"
            >
                <CreateTransportCompany
                    form={formTk}
                    handleFinish={handleFinish}
                    isError={isErrorCreateTk}
                    isSuccess={isSuccessCreateTk}
                    isLoading={isLoadingCreateTk}
                />
            </EmptyModal>
            <Col sm={24} xl={24} md={24} lg={24}>
                <CreateProvider
                    handleOpen={createTransportCompanyOpen}
                    dataTransportCompany={
                        dataTransportCompany ? dataTransportCompany : []
                    }
                />
            </Col>
        </Row>
    );
};

export default ProviderFeatures;
