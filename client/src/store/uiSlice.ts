import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? storedDarkMode === 'true' : false;
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDarkMode: getInitialDarkMode(),
        isLoading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload;
            localStorage.setItem('darkMode', action.payload);
        }
    }
});

export const { setLoading, setDarkMode } = uiSlice.actions;