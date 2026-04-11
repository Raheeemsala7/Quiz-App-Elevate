import { authOptions } from "@/auth";
import { IDiplomasResponse } from "@/lib/types/diploma";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";




export const getDiplomasApi = async () => {

    // const cookiesStore = await cookies()
    // const token = cookiesStore.get("next-auth.session-token")?.value
    // console.log(token)

    const session = await getServerSession(authOptions)
    const token = session
    console.log(token)



    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diplomas?page=1&limit=20`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    const data: IApiResponse<IDiplomasResponse | ErrorResponse> = await res.json();
    console.log(data)


    if (!res.ok) {
        console.log(data)
        // throw new Error(data.message || "Something went wrong");
    }

    return data


}