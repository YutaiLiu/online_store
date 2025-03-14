import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? storedDarkMode === 'true' : false;
}

const getInitialCartItemsCount = () => {
    const storedCartItemsCount = localStorage.getItem('cartItemsCount');
    return storedCartItemsCount ? parseInt(storedCartItemsCount) : 0;
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDarkMode: getInitialDarkMode(),
        isLoading: false,
        cartItemsCount: getInitialCartItemsCount(),
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload;
            localStorage.setItem('darkMode', action.payload);
        },
        setCartItemsCount: (state, action) => {
            state.cartItemsCount = action.payload;
            localStorage.setItem('cartItemsCount', action.payload);
        }
    }
});

export const { setLoading, setDarkMode, setCartItemsCount } = uiSlice.actions;