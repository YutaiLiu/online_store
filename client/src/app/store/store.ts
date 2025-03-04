import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterReducer";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// Legacy - Create Redux store
// import { legacy_createStore } from "@reduxjs/toolkit";
// import { rootReducer } from "../../reducersLegacy/rootReducer";

// export const store = legacy_createStore(rootReducer);