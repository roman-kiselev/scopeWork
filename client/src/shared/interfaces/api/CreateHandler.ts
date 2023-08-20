import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";

export interface CreateHandler<S, A, E> {
    pending: CaseReducer<S, PayloadAction<A>>;
    fulfilled: CaseReducer<S, PayloadAction<A>>;
    rejected: CaseReducer<S, PayloadAction<E>>;
}
