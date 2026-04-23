import { IUser } from "../../auth/types/user";


export interface IProfile {
    user : IUser
}

export interface IPayloadUpdatedProfile {
    firstName: string;
    lastName: string;
    profilePhoto?: string;
    phone: string
}