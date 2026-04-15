"use client";

import { useQuery } from "@tanstack/react-query";
import { getExamsApi } from "./api";



export const useGetExams = (diplomaId: string) => {
    return useQuery({
        queryKey: ["exams"],
        queryFn: () => getExamsApi(diplomaId),

    })
}
