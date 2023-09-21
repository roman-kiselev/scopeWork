import { useForm, useWatch } from "antd/es/form/Form";
import FormCreateNameWork from "../../entities/nameWork/FormCreateNameWork";
import { nameWorkApi, typeWorkApi, unitsApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

const CreateNameWorkFeatures = () => {
    const [form] = useForm();
    const data = useWatch([], form);
    const { data: dataUnit } = unitsApi.useGetAllUnitsQuery();
    const { data: dataType } = typeWorkApi.useGetAllTypeWorkQuery();
    const [createNameWork, { isSuccess }] =
        nameWorkApi.useCreateNameWorkMutation();

    const { data: dataNameWorks } = nameWorkApi.useGetAllNameWorkQuery();

    const onFinish = async () => {
        const res = await createNameWork(data);
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
