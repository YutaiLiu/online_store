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
        resetFilters: (state) => {
            state.searchTerm = '';
            state.brands = [];
            state.types = [];
            state.pageNumber = 1;
            state.pageSize = 8;
        }
    }
});

export const { setOrderBy, setSearchTerm, setBrands, setTypes, setPageNumber, setPageSize, resetFilters } = catalogSlice.actions;