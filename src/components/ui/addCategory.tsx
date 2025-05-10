"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CategorySchema, CategotySchemaType } from '../features/category/schema/categorySchema';
import { useCreateCategories } from '../features/category/hooks/categoryHooks';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";  
import { Button } from './button';
import { Plus } from 'lucide-react';
import { Input } from './input';

const AddCategory = () => {
    const [loading, setLoading] = useState(false);

    const {register: editRegister, handleSubmit, formState:{errors}, reset} = useForm<CategotySchemaType>({
        resolver: zodResolver(CategorySchema)
    });

    const {mutate: category} = useCreateCategories();

    const onSubmit = (data: CategotySchemaType) => {
        try {
            setLoading(true);

            category(data, {
                onSuccess: (data) => {
                    console.log(data)
                },
                onError: (error) => {
                    console.log(error)
                }
            })

            reset();

            toast.success("Category has been created");
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

  return (
    <div>
        <Dialog>
        <DialogTrigger>
            <Button className='bg-blue-500 text-white'><Plus className='w-10 h-10' /> Add Category</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-2'>
                    <label>category</label>
                    <Input type='text' placeholder='Enter Category...' {...editRegister("name")}/>
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className='flex justify-end gap-2 mt-8'>
                    <Button className='bg-blue-500 text-white' type='submit' disabled={loading}>{loading ? 'uploading...' : 'upload'}</Button>
                </div>
            </form>
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddCategory