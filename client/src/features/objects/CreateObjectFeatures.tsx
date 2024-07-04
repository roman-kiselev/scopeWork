import { useForm, useWatch } from "antd/es/form/Form";
import { FormCreateObject } from "../../entities";
import { objectsApi } from "../../shared/api";

const CreateObjectFeatures = () => {
    const [form] = useForm();
    const data = useWatch([], form);

    const [createObject] = objectsApi.useCreateMutation();

    const onFinish = async () => {
        await createObject(data);
    };

    return <FormCreateObject form={form} onFinish={onFinish} />;
};

export default CreateObjectFeatures;
