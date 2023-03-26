"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Update = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    await fetch("/api/database", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, id }),
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

  const getData = async () => {
    const res = await fetch("/api/database/" + id);
    const json = await res.json();
    if (!json) {
      router.push("/404");
      return;
    }
    setTitle(json.post.title);
    setContent(json.post.content);
  };

  useEffect(() => {
    getData();
  }, []);

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
        {isLoading ? "Loading..." : "Update"}
      </button>
    </form>
  );
};

export default Update;
