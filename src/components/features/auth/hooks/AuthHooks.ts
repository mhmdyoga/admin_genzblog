import { useMutation } from "@tanstack/react-query";
import { LoginService } from "../services/AuthServices";

export function useLogin() {
    return useMutation({
        mutationFn: LoginService
    })
}