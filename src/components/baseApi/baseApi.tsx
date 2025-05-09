import axios from 'axios';

export const baseApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_KEY
})