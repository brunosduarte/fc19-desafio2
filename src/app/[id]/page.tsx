import { fetchPostById } from "@/lib/posts";
import Link from "next/link";
import React from "react";

interface Params {
  params: {
    id: string;
  };
}

export default async function Post({ params }: Params) {
  const { id } = await params;
  const data = await fetchPostById(+id);

  return (
    <div className="flex flex-col min-h-screen items-center justify-start p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="bg-gray-800 rounded-md shadow-lg w-full max-w-3xl">
        <div className="flex justify-start w-full p-1">
          <Link href="/" className="p-2 text-gray-200 hover:text-gray-400 mb-4">
            Voltar
          </Link>
        </div>
        <div className="flex items-center h-20 p-4 justify-center border-b border-gray-700">
          <h1 className="text-3xl text-center text-gray-200 truncate">
            {data ? data.title : "Post não encontrado."}
          </h1>
        </div>
        <div className="flex-grow flex items-start justify-center p-4">
          <div className="w-full max-w-2xl p-4 bg-gray-800 rounded-lg shadow-md">
            {data ? (
              <p className="text-gray-300 whitespace-pre-wrap">{data.body}</p>
            ) : (
              <p className="text-gray-400 text-center">Post não encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
