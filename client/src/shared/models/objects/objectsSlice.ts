import { createSlice } from '@reduxjs/toolkit'

interface ICreateObject {
    name: string;
    address: string;
}

interface IListObjects {
    id: number;

}

interface IObjectsSlice {
    createObject: ICreateObject,

}


const initialState: IObjectsSlice = {
    createObject: {
        name: '',
        address: ''
    }
}


export const objectSlice = createSlice({
    name: 'objects',
    initialState,
    reducers: {}

})


export {}