import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";
import ContentComponent from "./components/ContentComponent";

const getPosts = async () => {
  const res = await fetch(process.env.BASE_URL + "/api/database", {
    next: { revalidate: 0 },
  });
  const json = await res.json();
  return json;
};

const Home = async () => {
  const posts = await getPosts();

  return (
    <div className="mx-auto w-[1000px] pt-20">
      <Link
        href={"/create"}
        className="rounded-md bg-zinc-900 px-3 py-2 text-white hover:bg-zinc-800 active:bg-zinc-700"
      >
        Create
      </Link>

      <div className=" mt-8 flex flex-col gap-4">
        {posts?.posts?.map((post: any, index: number) => (
          <ContentComponent key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
