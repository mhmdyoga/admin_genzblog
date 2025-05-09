import { baseApi } from "@/components/baseApi/baseApi"

export type Article ={
    title?: string
    content?: string
    categoryId?: string
}

export const getNewsByPagination = async(page:number) => {
    const response = await baseApi.get(`/articles?page=${page}`);
    return response.data
}

export const getNewsBySearch = async(query: string) => {
    const response = await baseApi.get(`/articles?title=${query}`);
    return response.data
}
