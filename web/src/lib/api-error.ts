import type { JsonResponse } from "@/types/json-response";
import type { LoginResponse } from "@/types/user";
import type { AxiosError } from "axios";

export function httpError(e: Error): Error {
    let axiosError: AxiosError<JsonResponse<LoginResponse>, any>;
    axiosError = e as AxiosError<JsonResponse<LoginResponse>, any>;
    return new Error(axiosError.response?.data.message);
}

export function unwrapAxiosError(e: Error): string {
    let axiosError: AxiosError<JsonResponse<null>, any>;
    axiosError = e as AxiosError<JsonResponse<null>, any>;
    return axiosError.response?.data.message ?? '';
}