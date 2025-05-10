"use client"
import React from 'react';
import dynamic from "next/dynamic";
import { Loader2 } from 'lucide-react';
import ProtectedRouteAdmin from '@/components/protectedRoute/protectedRoute';

const Categories = () => {
  const Categorypage = dynamic(() => import("@/components/pages/Categorypage"), {
    loading:() => <Loader2 className='w-10 h-10 animate-spin'/>,
    ssr: false,
  });
  return (
    <div>
      <ProtectedRouteAdmin>
        <Categorypage/>
      </ProtectedRouteAdmin>
    </div>
  )
}

export default Categories