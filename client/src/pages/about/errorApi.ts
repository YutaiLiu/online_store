import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuryWithErrorHandling } from "../../api/baseApi";

// note that the import library
// createApi will generate hooks for us to use in our components
// fetchBaseQuery is a function that will be used to make requests to the API
// baseUrl is the base URL of the API
// endpoints is an object that contains all the endpoints we want to use
export const errorApi = createApi({
    reducerPath: "errorApi",
    baseQuery: baseQuryWithErrorHandling,
    endpoints: (builder) => ({
        get400Error: builder.query<void, void>({
            query: () => 'buggy/bad-request',
        }),
        get401Error: builder.query<void, void>({
            query: () => 'buggy/unauthorized',
        }),
        get404Error: builder.query<void, void>({
            query: () => 'buggy/not-found',
        }),
        get500Error: builder.query<void, void>({
            query: () => 'buggy/server-error',
        }),
    })
});

export const {
    useLazyGet400ErrorQuery,
    useLazyGet401ErrorQuery,
    useLazyGet404ErrorQuery,
    useLazyGet500ErrorQuery
} = errorApi;