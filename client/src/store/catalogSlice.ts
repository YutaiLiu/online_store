import { createSlice } from "@reduxjs/toolkit";
import { ProductParams } from "../models/ProductParams";

const initialState : ProductParams = {
    orderBy: 'name',
    searchTerm: '',
    brands: [],
    types: [],
    pageNumber: 1,
    pageSize: 8
};

export const catalogSlice = createSlice({
    name: 'catalogSlice',
    initialState,
    reducers: {
        setOrderBy: (state, action) => {
            state.orderBy = action.payload;
            state.pageNumber = 1;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            state.pageNumber = 1;
        },
        setBrands: (state, action) => {
            state.brands = action.payload;
            state.pageNumber = 1;
        },
        setTypes: (state, action) => {
            state.types = action.payload;
            state.pageNumber = 1;
        },
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        },
        resetParams: () => {
            return initialState;
        }
    }
});

export const { setOrderBy, setSearchTerm, setBrands, setTypes, setPageNumber, setPageSize, resetParams } = catalogSlice.actions;