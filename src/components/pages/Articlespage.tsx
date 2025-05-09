/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetNewsByPagination } from '../features/news/hooks/Newshook';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import AddArticle from '../ui/addArticle';
import EditArticle from '../ui/editArticle';
import { Button } from '../ui/button';
import axios from 'axios';
import { toast } from "sonner"



const Articlespage = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };


  useEffect(() => {
  const storageName = localStorage.getItem("username");
    if(storageName){
      setName(storageName);
    }
  }, [name])
  

  const { data: NewsItem, isLoading } = useGetNewsByPagination(page);

  const handleEdit = (id: string) => {
    setSelectedArticleId(id);
    setEditOpen(true);
  }

  const handleCloseEdit = () => {
    setSelectedArticleId(null);
    setEditOpen(false);
    toast("Updated Successfully",{
      description: "News has been updated"
    })
  }

  const handleDeleteNews = async(id: string) => {
     try {
      await axios.delete(`${process.env.NEXT_PUBLIC_ADMIN_API_KEY}/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      toast("Deleted Successfully",{
        description: "News has been deleted"
      })
     } catch (error) {
      console.log('failed to delete:',error)
     }
  }


  return (
    <div className='p-2'>
      <div className='flex flex-row items-center justify-between bg-white shadow-md md:w-[1040px] p-4'>
        <h1 className='font-semibold text-2xl'>
          Articles
        </h1>
        <h2 className='font-semibold text-xl'>
          {name}
        </h2>
      </div>
      <div className='p-4 flex flex-row justify-between items-center '>
        <span className='font-semibold'>Total article: {NewsItem?.total}</span>
        <AddArticle/>
      </div>
      {/* table article */}
      <div className='p-4'>
        {isLoading ? (
          <div className='flex justify-center items-center h-screen'>
            <Loader className='w-10 h-10 animate-spin' />
          </div>
        ) : (
          <Table>
            <TableCaption>A list of your articles.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Thumbnail</TableHead>
                <TableHead className='text-center'>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {NewsItem.data.map((news: any) => (
                <TableRow key={news.id}>
                  <TableCell>
                    <Image src={news.imageUrl || '/noimage.png'} alt="ppp" width={620} height={620} className='w-auto h-auto object-cover' />
                  </TableCell>
                  <TableCell>
                    <span className='font-semibold items-center flex'>{news.title}</span>
                  </TableCell>
                  <TableCell>
                    <span className='font-semibold'>{news.category.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className='font-semibold'>{new Date(news.createdAt).toLocaleDateString()}</span>
                  </TableCell>
                  <TableCell className="flex flex-row gap-2">
                    <Button className='bg-blue-500 text-white font-bold cursor-pointer' onClick={() => handleEdit(news.id)}>Edit</Button>
                    <Button variant={"destructive"} onClick={() => handleDeleteNews(news.id)} className='cursor-pointer'>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
                {selectedArticleId && (
                <EditArticle
                  articleId={selectedArticleId}
                  open={editOpen}
                  onClose={handleCloseEdit}
                />
              )}
            </TableBody>
          </Table>
        )}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(page - 1)} aria-disabled={page === 1} className={`${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default Articlespage