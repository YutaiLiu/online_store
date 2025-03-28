import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { setLoading } from "../store/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

const baseQuery = fetchBaseQuery({ 
    baseUrl: 'https://localhost:5001/api',
    // Including credentials in the request allows the API to set cookies in the browser
    credentials: 'include',
 });

const sleep = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const baseQueryWithErrorHandling = async (
    args: string | FetchArgs, 
    api: BaseQueryApi,
    extraOptions: object) => {
    api.dispatch(setLoading(true));
    await sleep();
    const result = await baseQuery(args, api, extraOptions);
    api.dispatch(setLoading(false));
    if (result.error) 
    {
        const { status } = result.error;
        const errorMessages = (result.error.data && typeof result.error.data === 'object' && 'title' in result.error.data) 
            ? result.error.data.title as string : 'An error occurred';
        toast.error(`${ status }: ${ errorMessages }`);
        if (status === 500) 
        {
            router.navigate('/Server-error', { state: { error: result.error.data } });
        }
        else if (status === 400)
        {
            router.navigate('/not-found');
        }
    }
    return result;
}