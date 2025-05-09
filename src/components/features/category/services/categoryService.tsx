/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/components/baseApi/baseApi"

export type Categories = {
    id?: string
    name?: string
    createdAt?: any
}


export const getCategories = async (page: number) => {
    const response = await baseApi.get(`/categories?page=${page}`);
    return response.data
}

export const AddCategory = async(data: Categories) => {
    const response = await baseApi.post('/categories', data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data
}

export const DeleteCategory = async(id: Categories) => {
    const response = await baseApi.delete(`/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data
}