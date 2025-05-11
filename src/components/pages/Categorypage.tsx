"use client"
import React, { useEffect, useState } from 'react'
import { useDeleteCategory, useGetCategory } from '../features/category/hooks/categoryHooks';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Categories, EditCategory } from '../features/category/services/categoryService';
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
import AddCategory from '../ui/addCategory';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from 'react-hook-form';
import { editCategorySchema, EditCategorySchemaType } from '../features/category/schema/categorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';

const CategoryPage = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

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

  const { mutate: deleteCategory } = useDeleteCategory()
  
    const handleDeleteCat = (id: string) => {
      try {
        deleteCategory(id);
        toast.success("Category has been deleted")
      } catch (error) {
        console.log(error)
      }
    }

    const {register, handleSubmit, formState: {errors}, reset} = useForm<EditCategorySchemaType>({
      resolver: zodResolver(editCategorySchema)
    });

    const onSubmit = (data: EditCategorySchemaType) => {
      try {
        if(!editId) return
        EditCategory( editId,data);
        reset();
        toast.success("Category has been edited")
      } catch (error) {
        console.log(error)
      }
    }

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
          <div className='flex flex-col gap-4'>
            <h2>Total category: {Categories?.totalData}</h2>
          </div>
          <AddCategory/>
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
                    {/* edit dialog */}
                  <Dialog>
                      <DialogTrigger>
                       <Button variant={"link"} className='text-blue-500' onClick={() => setEditId(String(items.id))}>Edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Dialog?</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className='flex flex-col gap-2'>
                            <label>Name Category</label>
                            <Input type="text" {...register("name")}/>
                            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                          </div>
                          <div className='flex justify-end gap-2 mt-8'>
                            <Button type='submit' variant={"outline"} className='bg-blue-500 text-white'>Edit</Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                    {/* delete dialog */}
                    <Dialog>
                      <DialogTrigger>
                        <Button variant={"link"} className='text-red-500'>Delete</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure delete category?</DialogTitle>
                        </DialogHeader>
                        <div className='flex justify-end gap-2 mt-8'>
                          <Button variant={"outline"} className='bg-black text-white'>Cancel</Button>
                          <Button variant={"destructive"} onClick={() => handleDeleteCat(String(items.id))}>Delete</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
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