import { IPagination } from './exam.d';


declare type SuccessResponse<T> = {
    status: true
    code: number;
    message?: string
    payload: T
}
declare type IErrorResponse = {
    status: false
    code: number;
    message?: string;
    errors?: Array<{
        path: string;
        message: string;
    }>
}

declare type IApiResponse<T> = SuccessResponse<T> | IErrorResponse

declare interface IPagination<T> {
    data: T[];
    metadata: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ITimeStamp {
    createdAt: string;
    updatedAt: string;
}