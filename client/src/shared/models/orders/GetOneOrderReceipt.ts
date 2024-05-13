import CreateOrderReceipt from "./CreateOrderReceipt";

// class GetOneOrderReceipt
//     implements CreateHandler<IOrderSlice, IOrderReceiptResult, IDataError>
// {
//     pending: CaseReducer<IOrderSlice> = (state) => {
//         state.orderReceipt.isLoading = true;
//         state.orderReceipt.isError = false;
//         state.orderReceipt.isSuccess = false;
//     };

//     fulfilled: CaseReducer<
//         IOrderSlice,
//         { payload: IOrderReceiptResult; type: string }
//     > = (state, action) => {
//         state.orderReceipt.isError = false;
//         state.orderReceipt.isLoading = false;
//         state.orderReceipt.isSuccess = true;
//         const {
//             id,
//             userCreateId,
//             orderReceiptNames,
//             storage,
//             state: orderState,
//         } = action.payload;
//         state.orderReceipt.numberOrder = id;
//         state.orderReceipt.stateOrder = orderState;
//         state.orderReceipt.storage = storage;
//     };

//     rejected: CaseReducer<IOrderSlice> = (state) => {
//         state.orderReceipt.isError = true;
//         state.orderReceipt.isLoading = false;
//         state.orderReceipt.isSuccess = false;
//     };
// }

class GetOneOrderReceipt extends CreateOrderReceipt {}

export default GetOneOrderReceipt;
