import { useEffect, useState } from "react";
import type { Book } from "../../types";
import { supabase } from "../../utils/supabase";

export default function Books() {

    const [books, setFetchedBooks] = useState<Book[]>([]);

    useEffect(() => {
        async function getBooks() {

            const { data: books } = await supabase
                .from('Books')
                .select()
                .order('created_at', { ascending: false });

            if (!books)
                return;

            if (books) {
                setFetchedBooks(books as Book[]);
            }

        }

        getBooks();

    }, []);

    return (
        <main className="bg-primary flex justify-center pt-16 pb-4 min-h-screen">
            <div className="flex-1 flex items-center flex-col min-h-0">
                {books.map((book, index) => (
                    <div
                        style={{
                            backgroundColor: book.color,
                            transform: `rotate(${(Math.random() - 0.5) * 1.5}deg)`,
                            marginTop: Math.random() * 10 + 5,
                            width: (-Math.exp(3.5 - (0.1 * book.title.length)) + 100) + '%',
                            height: Math.random() * 20 + 50 + 'px',
                        }}
                        key={index}
                        className={`group relative overflow-hidden hover:ring-5 ring-offset-primary ring-0 ring-transparent hover:z-100 rounded-sm hover:ring-accent hover:ring-offset-4 transition-all duration-150 cursor-pointer flex flex-row items-center justify-between w-full gap-4 px-5 shadow-[0_4px_8px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.08)_inset]`}
                    >
                        {/* embossed bands, evenly inset from each edge */}
                        <div className="absolute inset-y-1 left-[30%] w-[3px] bg-[image:linear-gradient(90deg,rgba(0,0,0,0.35),rgba(255,255,255,0.1)_50%,rgba(0,0,0,0.35))] rounded-sm opacity-70 pointer-events-none" />
                        <div className="absolute inset-y-1 right-[30%] w-[3px] bg-[image:linear-gradient(90deg,rgba(0,0,0,0.35),rgba(255,255,255,0.1)_50%,rgba(0,0,0,0.35))] rounded-sm opacity-70 pointer-events-none" />

                        <h2 className="[text-shadow:1px_1px_0_rgba(0,0,0,0.5),-1px_-1px_0_rgba(0,0,0,0.5),1px_-1px_0_rgba(0,0,0,0.5),-1px_1px_0_rgba(0,0,0,0.5)] text-nowrap text-3xl z-20 font-fancy font-bold text-left text-text">{book.title}</h2>
                        <p className="opacity-0 z-20 text-secondary group-hover:opacity-100 transition-opacity duration-300 text-center">Rating: {book.rating.composite}</p>
                        <p className="text-lg z-20 text-right text-text">{book.author}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}