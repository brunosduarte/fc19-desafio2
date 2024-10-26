import { Post } from "./types";

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { tags: ["posts"] },
  });
  return await res.json();
}

export async function fetchPostById(id: number): Promise<Post | null> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { tags: [`post:${id}`] },
  });
  const data = await res.json();
  return data.find((p: Post) => p.id === id);
}
