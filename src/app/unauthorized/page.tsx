"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

 const Unauthorized = () => {
  const router = useRouter()
  return (
    <div className='ml-[450px]'>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="mx-auto max-w-md overflow-hidden border-none shadow-lg">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-500/10" />
        <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-red-500/10" />
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <ShieldAlert className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Akses Ditolak</CardTitle>
          <CardDescription className="text-base">
            Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="rounded-lg bg-amber-50 p-4">
            <div className="flex items-start gap-4">
              <Lock className="mt-0.5 h-5 w-5 text-amber-600" />
              <div>
                <h3 className="font-medium text-amber-800">Informasi</h3>
                <p className="text-sm text-amber-700">
                  Anda perlu login atau memiliki hak akses yang sesuai untuk melihat konten ini.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">pilihan</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 px-6 pb-6 pt-0">
          <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => router.push('/auth/sign-in')}>Login Sekarang</Button>
        </CardFooter>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Jika Anda yakin seharusnya memiliki akses, silakan hubungi administrator.</p>
        <p className="mt-1">
          <Link href="#" className="text-red-600 hover:underline">
            Hubungi Dukungan
          </Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Unauthorized