import { Row, Select } from "antd";
import { IProvider } from "src/shared/interfaces";

interface ICellProviderProps {
    cellKey: string;
    providers: IProvider[] | undefined;
}

const CellProvider: React.FC<ICellProviderProps> = ({ cellKey, providers }) => {
    const optionsProviders =
        providers && providers !== undefined
            ? providers.map((item) => {
                  return {
                      key: item.id,
                      value: item.id,
                      label: item.name,
                  };
              })
            : [];

    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log("search:", value);
    };

    // Filter `option.label` match the user type `input`
    const filterOption = (
        input: string,
        option?: { label: string; value: number; key: number }
    ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    return (
        <Row>
            {/* <Select
                style={{ width: "90%", margin: "0 auto" }}
                onChange={() => {}}
                options={optionsProviders}
            /> */}
            <Select
                showSearch
                placeholder="Выбор"
                style={{ width: "100%", margin: "0 auto" }}
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={optionsProviders}
            />
        </Row>
    );
};

export default CellProvider;
