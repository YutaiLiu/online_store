import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../reducersLegacy/counterReducerForPractice";
import { useDispatch, useSelector } from "react-redux";
import { catalogApi } from "../api/catalogApi";
import { uiSlice } from "./uiSlice";
import { errorApi } from "../api/errorApi";
import { shoppingCartApi } from "../api/shoppingCartApi";
import { catalogSlice } from "./catalogSlice";
import { accountApi } from "../api/accountApi";

export const store = configureStore({
    reducer: {
        // this is RTK Query reducer
        [catalogApi.reducerPath]: catalogApi.reducer,
        [errorApi.reducerPath]: errorApi.reducer,
        [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        catalog: catalogSlice.reducer,
        counter: counterSlice.reducer,
        ui: uiSlice.reducer
    },
    // Add the API middleware to the store
    // middleware will take care of the API requests and responses
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            catalogApi.middleware, 
            errorApi.middleware, 
            shoppingCartApi.middleware,
            accountApi.middleware
        )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// Legacy - Create Redux store
// import { legacy_createStore } from "@reduxjs/toolkit";
// import { rootReducer } from "../../reducersLegacy/rootReducer";

// export const store = legacy_createStore(rootReducer);