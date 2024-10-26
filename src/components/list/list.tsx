"use client";

import { Post } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ListProps {
  head: string;
  data: Post[];
}

export default function List({ head, data }: ListProps) {
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const perPage = 10;
  const start = (page - 1) * perPage;
  const end = page * perPage;

  const router = useRouter();

  const filteredData = data.filter((elm) =>
    elm.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const pages = Math.ceil(filteredData.length / perPage);

  function nextPage() {
    if (page < pages) {
      setPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }

  function redirect(elm: Post) {
    router.push(`/${elm.id}`);
  }

  return (
    <div className="w-[700px] bg-gray-800 rounded-lg shadow-md overflow-hidden max-w-3xl mx-auto">
      <div className="flex items-center justify-between px-4 py-4 text-gray-300 uppercase font-medium border-b border-gray-700">
        <span>{head}</span>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-4 p-2 w-[300px] bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <ul className="w-full">
        {filteredData.slice(start, end).map((elm, idx) => (
          <li
            key={idx}
            className="text-center capitalize hover:bg-gray-700 transition-colors px-4 py-3 border-b border-gray-700 whitespace-nowrap cursor-pointer"
            onClick={() => redirect(elm)}
          >
            {elm.title}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between p-4">
        <button
          onClick={prevPage}
          disabled={page <= 1}
          className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-xl"> &#8592;</span>
        </button>
        <span className="text-sm text-gray-400">
          Página {page} de {pages}
        </span>
        <button
          onClick={nextPage}
          disabled={page >= pages}
          className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-xl">&#8594;</span>
        </button>
      </div>
    </div>
  );
}
