import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { setLoading } from "../store/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
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
    if (result.error) {
        const { status } = result.error;
        if (result.error.data && typeof result.error.data === 'object') {
            if ('errors' in result.error.data) {
                return result;  
            }
            else if ('title' in result.error.data) {
                const errorMessage = result.error.data.title as string;
                toast.error(`${status} Error: ${errorMessage}`);
                if (status == 500) {
                    router.navigate('/Server-error', { state: { error: result.error.data } });
                }
                else if (status == 400) {
                    router.navigate('/not-found');
                }
            }
        }
    }
    return result;
}