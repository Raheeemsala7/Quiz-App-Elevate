import { IUser } from "../../auth/types/user";


export interface IProfile {
    user: IUser
}

export interface IPayloadUpdatedProfile {
    firstName: string;
    lastName: string;
    profilePhoto?: string;
    phone: string
}


export interface IPayloadEmailRequest {
    message: string,
    code: string
}
export interface IRequestEmailResponse {
    message: string,
    code: string
}