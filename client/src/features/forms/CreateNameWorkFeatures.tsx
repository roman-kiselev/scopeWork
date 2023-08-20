import { useForm, useWatch } from "antd/es/form/Form";
import FormCreateNameWork from "../../entities/nameWork/FormCreateNameWork";
import { typeWorkApi, unitsApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

const CreateNameWorkFeatures = () => {
    const [form] = useForm();
    const data = useWatch([], form);
    const { data: dataUnit } = unitsApi.useGetAllUnitsQuery();
    const { data: dataType } = typeWorkApi.useGetAllTypeWorkQuery();

    const onFinish = () => {};
    const { listUnits } = useAppSelector((state) => state.unit);
    const { listTypeWork } = useAppSelector((state) => state.typeWork);
    console.log(data);
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
