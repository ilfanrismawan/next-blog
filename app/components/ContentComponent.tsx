"use client";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  post: Post;
}

const ContentComponent = ({ post }: Props) => {
  const router = useRouter();
  const handleDelete = async (id: number) => {
    await fetch("/api/database?id=" + id, {
      method: "DELETE",
    });
    router.refresh();
  };

  return (
    <div className="flex flex-col rounded-md border p-4">
      <h2 className="text-sm">ID: {post.id}</h2>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div className="mt-4 inline-flex gap-4">
        <button
          onClick={() => router.push(`/update/${post.id}`)}
          className="text-xs font-bold hover:text-zinc-800"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(post.id)}
          className="text-xs font-bold text-red-500 hover:text-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContentComponent;
