import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuryWithErrorHandling } from "./baseApi";
import { ShoppingCart } from "../models/ShoppingCart";

export const ShoppingCartApi = createApi({
    reducerPath: 'shoppingCartApi',
    baseQuery: baseQuryWithErrorHandling,
    tagTypes: ['ShoppingCart'],
    endpoints: (builder) => ({
        fetchShoppingCart: builder.query<ShoppingCart, void>({
            query: () => '/shopping-cart',
            providesTags: ['ShoppingCart']
        }),
        addItemToCart: builder.mutation<ShoppingCart, {productId: number, quantity: number}>({
            query: ({productId, quantity}) => ({
                url: `/shopping-cart/add?productId=${productId}&quantity=${quantity}`,
                method: 'POST'
            }),
            invalidatesTags: ['ShoppingCart'],
        }),
        removeItemFromCart: builder.mutation<ShoppingCart, {productId: number, quantity: number}>({
            query: ({productId, quantity}) => ({
                url: `/shopping-cart/remove?productId=${productId}&quantity=${quantity}`,
                method: 'POST'
            }),
        }),
    })
});

export const { useFetchShoppingCartQuery, useAddItemToCartMutation, useRemoveItemFromCartMutation } = ShoppingCartApi;