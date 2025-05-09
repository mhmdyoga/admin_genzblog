"use client";
import { useQuery } from "@tanstack/react-query";
import { getNewsByPagination, getNewsBySearch } from "../services/NewsServices";


export function useGetNewsByPagination(page: number) {
    return useQuery({
        queryKey: ["news", page],
        queryFn: () => getNewsByPagination(page),
    })
}

export function useGetNewsBySearch(query: string) {
    return useQuery({
        queryKey: ["news", query],
        queryFn: () => getNewsBySearch(query),
    })
}
