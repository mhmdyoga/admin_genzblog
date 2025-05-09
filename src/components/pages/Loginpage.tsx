/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useLogin } from '@/components/features/auth/hooks/AuthHooks';
import { LoginShcema, LoginType } from '@/components/features/auth/schema/AuthSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LucideLoader } from 'lucide-react';

const Loginpage = () => {
  const {
    register: loginRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginShcema),
  });
  const router = useRouter()

  const { mutate: loginUser, isLoading } = useLogin();

  const onSubmit = (data: LoginType) => {
    console.log(data);
    loginUser(data, {
      onSuccess: (res) => {
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", res.role);
        localStorage.setItem("token", res.token)
        router.push('/')
      },
      onError: (err: unknown) => {
        toast("Error",{
          className: "bg-red-500 text-white",
          description: (err as any).response.data.error,
          duration: 9000,
        })
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[450px] ml-[455px]">
        <CardHeader>
          <CardTitle className="text-center">LogoIpsum</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                placeholder="Username"
                {...loginRegister("username")}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username.message}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                {...loginRegister("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? <LucideLoader className='animate-spin'/> : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Loginpage;
