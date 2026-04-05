

declare type SuccessResponse<T> = {
    status: true
    code: number;
    message?: string
    payload: T
}
declare type ErrorResponse = {
    status: false
    code: number;
    message?: string;
    errors?: Array<{
        path: string;
        message: string;
    }>
}

declare type IApiResponse<T> = SuccessResponse<T> | ErrorResponse