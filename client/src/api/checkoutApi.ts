import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./baseApi";
import { ShoppingCart } from "../models/ShoppingCart";
import { shoppingCartApi } from "./shoppingCartApi";

export const checkoutApi = createApi({
    reducerPath: 'checkoutApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        createPaymentIntent: builder.mutation<ShoppingCart, void>({
            query: () => {
                return {
                    url: '/payments',
                    method: 'POST'
                }
            },
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        shoppingCartApi.util.updateQueryData('fetchShoppingCart', undefined, (draft) => {
                            draft.clientSecret = data.clientSecret;
                            draft.paymentIntentId = data.paymentIntentId;
                        })
                    );
                } catch (error) {
                    console.log('Payment intent creation failed: ', error);
                }
            }
        })
    })
})

export const { useCreatePaymentIntentMutation } = checkoutApi;