"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    await fetch("/api/database", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-[500px] flex-col gap-2 pt-20"
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-md border p-2"
      />
      <input
        className="w-full rounded-md border p-2"
        placeholder="description"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default Create;
