import List from "@/components/list/list";
import { fetchPosts } from "@/lib/posts";

export default async function Home() {
  const data = await fetchPosts();
  return (
    <div className="flex flex-col min-h-screen items-center justify-between p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex-grow flex items-start justify-center">
        <List head="títulos" data={data} />
      </main>
    </div>
  );
}
