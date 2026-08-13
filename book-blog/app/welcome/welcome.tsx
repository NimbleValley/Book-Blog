import { useState, useEffect } from "react";
import Books from "~/books/books";
import { supabase } from "../../utils/supabase";


export function Welcome() {

  const [len, setLen] = useState<number>(-1);

  useEffect(() => {
    async function getBooks() {
      const { data: books } = await supabase.from('Books').select();

      setLen(books?.length ?? -1);

    }

    getBooks();

  }, []);

  return (
    <main className="bg-primary flex justify-center pt-16 pb-4 min-h-screen">
      <div className="flex-1 flex flex-col gap-16 min-h-0 max-w-[700px]">

        <div className="flex flex-row items-center w-full gap-4 px-5">
          <h1 className="text-7xl flex-1 font-bold font-fancy text-left text-text">
            Mason's Boog.
          </h1>
          <p className="text-2xl flex-1 text-right text-right text-accent">
            Boog is slang for book-blog. These are some of the books I've read & rated over the last couple years. {len == -1 ? ' ' : len} books currently.
          </p>
        </div>

        <Books />

      </div>
    </main>
  );
}