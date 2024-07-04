import { useForm, useWatch } from "antd/es/form/Form";
import { FormUnit } from "../../entities";
import { unitsApi } from "../../shared/api";

const CreateUnitForm = () => {
    const [form] = useForm();
    const data = useWatch([], form);
    const [createUnit] = unitsApi.useCreateUnitMutation();
    const finish = async () => {
        await createUnit(data);
    };

    return <FormUnit form={form} onFinish={finish} />;
};

export default CreateUnitForm;
