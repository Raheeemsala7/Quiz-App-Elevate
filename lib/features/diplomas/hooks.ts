"use client"

import { useQuery } from "@tanstack/react-query"
import { getDiplomasApi } from "./api"

export const getDiplomasQuery = () => {
    return useQuery({
        queryKey: ["diplomas"],
        queryFn: getDiplomasApi,
    })
}

