import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "../../models/Product";
import { baseQuryWithErrorHandling } from "../../api/baseApi";

type ProductResponse = Product[];

// createApi will generate hooks for us to use in our components
// fetchBaseQuery is a function that will be used to make requests to the API
// baseUrl is the base URL of the API
// endpoints is an object that contains all the endpoints we want to use
export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQuryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<ProductResponse, void>({
            query: () => '/products',
        }),
        fetchProductById: builder.query<Product, number>({
            query: (id) => `/products/${id}`,
        }),
    })
});

// Export the auto-generated hooks for use in components
export const { useFetchProductsQuery, useFetchProductByIdQuery } = catalogApi;