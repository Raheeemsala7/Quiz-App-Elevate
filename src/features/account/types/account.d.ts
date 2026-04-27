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
    newEmail: string
}
export interface IRequestEmailResponse {
    message: string,
    code: string
}


export interface IPayloadEmailConfirm {
    code: string
}
export interface IConfirmEmailResponse {
    message: string,
    user: IUser
}
export interface IPayloadChangePassword {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}