import { IExamsResponse } from "@/lib/types/exam";
import { getNextAuthToken } from "@/lib/util/auth.util";

export const getExamsApi = async (
    diplomaId: string,
    page: number = 1,
    limit: number = 20
): Promise<IApiResponse<IExamsResponse>> => {
    const token = await getNextAuthToken();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/exams?diplomaId=${diplomaId}&page=${page}&limit=${limit}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token?.token}`,
            },
        }
    );

    const data: IApiResponse<IExamsResponse> = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};