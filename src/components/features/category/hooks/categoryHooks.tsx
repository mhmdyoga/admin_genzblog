"use client"
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddCategory, getCategories } from "../services/categoryService";

export function useGetCategory(page: number) {
    return useQuery({
        queryKey: ["category", page],
        queryFn: () => getCategories(page)
    })
}

export function useCreateCategories() {
    return useMutation({
        mutationFn: AddCategory
    })
}