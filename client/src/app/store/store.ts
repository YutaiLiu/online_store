import { legacy_createStore } from "@reduxjs/toolkit";
//import counterReducer from "../../features/contact/counterReducer";
import { rootReducer } from "../../reducersLegacy/rootReducer";

// Legacy - Create Redux store
export const store = legacy_createStore(rootReducer);

// export const store = configureStore({
//     reducer: {
//         counter: counterReducer
//     }
// })