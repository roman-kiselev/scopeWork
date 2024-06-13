import { Row, Select } from "antd";
import { useAppDispatch } from "src/shared/hooks";
import { IProvider } from "src/shared/interfaces";
import { editRow } from "src/shared/models";

interface ICellProviderProps {
    cellKey: string;
    providers: IProvider[] | undefined;
    defaultProvider?: IProvider | null;
    disabled?: boolean;
}

const CellProvider: React.FC<ICellProviderProps> = ({
    cellKey,
    providers,
    defaultProvider,
    disabled = false,
}) => {
    const dispatch = useAppDispatch();
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
        if (providers) {
            const findedItem = providers?.find(
                (item) => item.id === Number(value)
            );
            if (findedItem) {
                dispatch(
                    editRow({
                        key: cellKey,
                        nameField: "provider",
                        value: findedItem,
                    })
                );
            }
        }
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
                disabled={disabled}
                showSearch
                placeholder="Выбор"
                style={{ width: "100%", margin: "0 auto" }}
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={optionsProviders}
                defaultValue={defaultProvider ? defaultProvider.name : "Пусто"}
            />
        </Row>
    );
};

export default CellProvider;
