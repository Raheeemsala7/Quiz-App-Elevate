import { IDiplomasResponse } from "@/src/shared/lib/types/diploma";
import { getNextAuthToken } from "@/src/shared/lib/util/auth.util";



export const getDiplomasApi = async (page: number = 1) : Promise<IApiResponse<IDiplomasResponse>> => {

    const token = await getNextAuthToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diplomas?page=${page}&limit=3`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.token}`,
        },
    });

    const data: IApiResponse<IDiplomasResponse> = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data as IApiResponse<IDiplomasResponse>;
}