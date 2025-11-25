export interface JsonResponse<T> {
    items: T;
    isSuccess: boolean;
    message: string;
}

export interface Id {
    ID: number;
}