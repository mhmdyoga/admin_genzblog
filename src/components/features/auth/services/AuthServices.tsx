import { baseApi } from "@/components/baseApi/baseApi";

export type AuthCredentials = {
    username: string;
    password: string;
}

export const LoginService = async(credentials: AuthCredentials) => {
    const response = await baseApi.post(`/auth/login`, credentials);
    return response.data
}