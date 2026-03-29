

declare type SuccessResponse<T> = {
    success: true
    data: T
}
declare type ErrorResponse = {
    success: false
    status: number
    message: string
}

declare type ApiResponse<T> = SuccessResponse<T> | ErrorResponse