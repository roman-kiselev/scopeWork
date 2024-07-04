import { Spin } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import FormCreateNameWork from "../../entities/nameWork/FormCreateNameWork";
import { nameWorkApi, typeWorkApi, unitsApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

const CreateNameWorkFeatures = () => {
    const [form] = useForm();
    const data = useWatch([], form);
    const { isLoading: isLoadingUnit } = unitsApi.useGetAllUnitsQuery();
    const { isLoading: isLoadingType } = typeWorkApi.useGetAllTypeWorkQuery();
    const [createNameWork] = nameWorkApi.useCreateNameWorkMutation();
    const { isLoading: isLoadingNameWork } =
        nameWorkApi.useGetAllNameWorkQuery();
    if (isLoadingUnit || isLoadingType || isLoadingNameWork) <Spin />;
    const onFinish = async () => {
        await createNameWork(data);
    };
    const { listUnits } = useAppSelector((state) => state.unit);
    const { listTypeWork } = useAppSelector((state) => state.typeWork);

    return (
        <FormCreateNameWork
            form={form}
            onFinish={onFinish}
            units={listUnits}
            typeWorkList={listTypeWork}
        />
    );
};

export default CreateNameWorkFeatures;
