import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./baseApi";
import { Address, User } from "../models/User";
import { LoginSchema } from "../pages/login/loginSchema";
import { router } from "../routes/Routes";
import { toast } from "react-toastify";

export const accountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["UserInfo", "UserAddress"],
    endpoints: (builder) => ({
        // use mutation method for POST requests
        login: builder.mutation<void, LoginSchema>({
            // creds means the credentials we provide in the body of the request
            query: (creds) => {
                return {
                    url: "login?useCookies=true",
                    method: "POST",
                    body: creds,
                }
            },
            invalidatesTags: ["UserInfo"],
            async onQueryStarted(_, { queryFulfilled }) {
                await queryFulfilled;
                router.navigate("/catalog");
            }
        }),
        register: builder.mutation<void, object>({
            query: (creds) => {
                return {
                    url: "account/register",
                    method: "POST",
                    body: creds,
                }
            },
            async onQueryStarted(_, { queryFulfilled }) {
                await queryFulfilled;
                toast.success("Registration is successful, now you can start shopping!");
            }
        }),
        userInfo: builder.query<User, void>({
            providesTags: ["UserInfo"],
            query: () => "account/user-info"
        }),
        logout: builder.mutation<void, void>({
            query: () => {
                return {
                    url: "account/logout",
                    method: "POST",
                }
            },
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                await queryFulfilled;
                dispatch(accountApi.util.resetApiState())
                router.navigate("/login");
            }
        }),
        fetchAddress: builder.query<Address, void>({
            providesTags: ["UserAddress"],
            query: () => ({
                url: "account/address"
            })
        }),
        updateAddress: builder.mutation<Address, Address>({
            query: (address) => ({
                url: "account/address",
                method: "POST",
                body: address
            }),
            invalidatesTags: ["UserAddress"],
        })
    })
});

export const { useLoginMutation, useRegisterMutation, useUserInfoQuery, useLogoutMutation, useLazyUserInfoQuery, useFetchAddressQuery, useUpdateAddressMutation } = accountApi;