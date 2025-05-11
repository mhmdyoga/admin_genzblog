/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  createNewsSchema,
  CreateNewsType,
} from "@/components/features/news/schema/newsSchema";
import Image from "next/image";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

const AddArticle = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // preview state

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateNewsType>({
    resolver: zodResolver(createNewsSchema),
  });

  const selectedCategory = watch("categoryId");

  useEffect(() => {
    if (open) {
      axios
        .get(`${process.env.NEXT_PUBLIC_ADMIN_API_KEY}/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => setCategories(res.data?.data || res.data))
        .catch((err) => console.error("Failed to fetch categories", err));
    }
  }, [open]);

  const onSubmit = async (data: CreateNewsType) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", data.image[0]);

      const uploadRes = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API_KEY}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = uploadRes.data?.imageUrl;
      console.log(imageUrl);

      await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API_KEY}/articles`,
        {
          title: data.title,
          content: data.content,
          categoryId: data.categoryId,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      reset();
      setPreviewUrl(null); //  remove preview
      setOpen(false); // close modal
      toast("Article created successfully") // notification
    } catch (error) {
      console.error("Failed to submit article:", error);
    } finally {
      setLoading(false);
    }
  };

  // Clean up URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Article</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Article</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Title" {...register("title")} />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

            <Textarea placeholder="Content" {...register("content")} />
            {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}

            <Select onValueChange={(val) => setValue("categoryId", val)} value={selectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.filter((cat) => cat.id && cat.id.trim() !== "").map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-sm text-red-500">{errors.categoryId.message}</p>
            )}

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const fileList = e.target.files;
                if (fileList?.length) {
                  const file = fileList[0];
                  setPreviewUrl(URL.createObjectURL(file));
                  setValue("image", fileList as any, { shouldValidate: true }); // ✔ Sync ke form
                }
              }}
            />
            {errors.image && <p className="text-sm text-red-500">{String(errors.image?.message)}</p>}

            {previewUrl && (
              <Image
                src={previewUrl}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-lg"
                width={60}
                height={60}
              />
            )}

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddArticle;
