"use client"
import React, { useEffect, useState } from 'react'
import { useGetCategory } from '../features/category/hooks/categoryHooks';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Categories } from '../features/category/services/categoryService';
import { LucideLoaderPinwheel } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from '../ui/button';

const CategoryPage = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");

  useEffect(() => {
    const storageName = localStorage.getItem("username");
    if (storageName) {
      setName(storageName);
    }
  }, [name])

  const handleChangePage = (pages: number) => {
    if (pages < 1) return;
    setPage(pages)
  }

  const { data: Categories, isLoading } = useGetCategory(page);

  return (
    <div className="w-full p-4">
      <div className="w-full overflow-x-auto">
        <div className='flex flex-row items-center justify-between bg-white shadow-md md:w-[1040px] p-4'>
          <h1 className='font-semibold text-2xl'>
            Categories
          </h1>
          <h2 className='font-semibold text-xl'>
            {name}
          </h2>
        </div>
        <div className='flex justify-between items-center p-3'>
          <h2>Total category: {Categories?.totalData}</h2>
          <CategoryPage/>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-60 md:ml-[70px]">
            <LucideLoaderPinwheel className='w-10 h-10 animate-spin' />
          </div>
        ) : (
          <Table className='w-full'>
            <TableCaption>A list of your recent categories.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[350px]'>Name</TableHead>
                <TableHead className='w-[350px]'>Created At</TableHead>
                <TableHead className="w-[300px] text-center items-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Categories.data?.map((items: Categories) => (
                <TableRow key={items.id}>
                  <TableCell>{items.name}</TableCell>
                  <TableCell>{new Date(items.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="flex flex-row gap-2 ml-20">
                    <Button variant={"link"} className='text-blue-500'>Edit</Button>
                    <Button variant={"link"} className='text-red-500'>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handleChangePage(page - 1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => handleChangePage(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default CategoryPage;