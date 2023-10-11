import { useAppSelector } from "../../../../shared/hooks";

const SelectedTabAskue = () => {
    const typeWorkTab = "Водоснабжение";
    const { scopeWorkData } = useAppSelector((store) => store.dataOneUser);
    let typeData;
    for (const data of scopeWorkData) {
        const { typeWork } = data;
        if (typeWork) {
            if (typeWork.name === typeWorkTab) {
                typeData = data;
            }
        }
    }

    console.log(typeData);

    return <h3>Askue</h3>;
};

export default SelectedTabAskue;
