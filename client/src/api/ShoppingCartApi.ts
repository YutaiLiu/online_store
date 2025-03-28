import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./baseApi";
import { ShoppingCart } from "../models/ShoppingCart";
import { setCartItemsCount } from "../store/uiSlice";
import { toast } from "react-toastify";

export const shoppingCartApi = createApi({
    reducerPath: 'shoppingCartApi',
    baseQuery: baseQueryWithErrorHandling,
    // The `tagTypes` property is used to define the tags that the API will use to invalidate cache entries
    // after a mutation is performed. In this case, the API will invalidate the cache entry with the tag `ShoppingCart`
    // after the `addItemToCart` mutation is performed.
    // So that the `fetchShoppingCart` query will be refetched and the UI will be updated with the new data.
    tagTypes: ['ShoppingCart'],
    endpoints: (builder) => ({
        fetchShoppingCart: builder.query<ShoppingCart, void>({
            query: () => '/shopping-cart',
            providesTags: ['ShoppingCart'],
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    const itemsCount = data.items.reduce((sum, item) => sum + item.quantity, 0);
                    dispatch(setCartItemsCount(itemsCount));
                }
                catch {
                    toast.error('Failed to show the count of shopping cart items');
                }
            }
        }),
        addItemToCart: builder.mutation<ShoppingCart, {productId: number, quantity: number}>({
            query: ({productId, quantity}) => ({
                url: `/shopping-cart/add?productId=${productId}&quantity=${quantity}`,
                method: 'POST'
            }),
            invalidatesTags: ['ShoppingCart'],
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    const itemsCount = data.items.reduce((sum, item) => sum + item.quantity, 0);
                    dispatch(setCartItemsCount(itemsCount));
                }
                catch {
                    toast.error('Failed to show the count of shopping cart items');
                }
            }
        }),
        removeItemFromCart: builder.mutation<ShoppingCart, {productId: number, quantity: number}>({
            query: ({productId, quantity}) => ({
                url: `/shopping-cart/remove?productId=${productId}&quantity=${quantity}`,
                method: 'POST'
            }),
            invalidatesTags: ['ShoppingCart'],
        }),
    })
});

export const { useFetchShoppingCartQuery, useAddItemToCartMutation, useRemoveItemFromCartMutation } = shoppingCartApi;