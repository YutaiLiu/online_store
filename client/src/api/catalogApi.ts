import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "../models/Product";
import { baseQuryWithErrorHandling } from "./baseApi";
import { Filter } from "../models/Filter";
import { ProductResponse } from "../models/ProductResponse";
import { ProductParams } from "../models/ProductParams";

// createApi will generate hooks for us to use in our components
// fetchBaseQuery is a function that will be used to make requests to the API
// baseUrl is the base URL of the API
// endpoints is an object that contains all the endpoints we want to use
export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQuryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<ProductResponse, ProductParams>({
            query: (productParams) => {
                return {
                    url: 'products',
                    params: productParams
                };
            },
        }),
        fetchProductById: builder.query<Product, { id: number }>({
            query: ({ id }) => `/products/${id}`,
        }),
        fetchFilter: builder.query<Filter, void>({
            query: () => 'products/filter',
        }),
    })
});

// Export the auto-generated hooks for use in components
export const { useFetchProductsQuery, useFetchProductByIdQuery, useFetchFilterQuery } = catalogApi;