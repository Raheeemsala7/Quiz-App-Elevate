import { authOptions } from "@/auth";
import { IDiplomasResponse } from "@/lib/types/diploma";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";




export const getDiplomasApi = async () => {

    const cookiesStore = await cookies()
    const token = cookiesStore.get(process.env.NEXT_AUTH_SESSION_COOKIE_NAME!)?.value
    console.log(token)



    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diplomas`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    const data: IApiResponse<IDiplomasResponse | ErrorResponse> = await res.json();
    console.log(data)


    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Something went wrong");
    }

    return data


}