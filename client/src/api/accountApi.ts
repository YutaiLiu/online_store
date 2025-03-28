import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./baseApi";
import { User } from "../models/User";

export const accountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        // use mutation method for POST requests
        login: builder.mutation<void, object>({
            // creds means the credentials we provide in the body of the request
            query: (creds) => {
                return {
                    url: "login?useCookie=true",
                    method: "POST",
                    body: creds,
                }
            }
        }),
        register: builder.mutation<void, object>({
            query: (creds) => {
                return {
                    url: "account/register",
                    method: "POST",
                    body: creds,
                }
            }
        }),
        userInfo: builder.query<User, void>({
            query: () => "account/user-info"
        }),
        logout: builder.mutation<void, void>({
            query: () => {
                return {
                    url: "account/logout",
                    method: "POST",
                }
            }
        })
    })
});

export const { useLoginMutation, useRegisterMutation, useUserInfoQuery, useLogoutMutation } = accountApi;