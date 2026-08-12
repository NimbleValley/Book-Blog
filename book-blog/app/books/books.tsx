import { useEffect, useState } from "react";
import type { Book } from "../../types";
import { supabase } from "../../utils/supabase";

export default function Books() {

    const [books, setFetchedBooks] = useState<Book[]>([]);

    useEffect(() => {
        async function getBooks() {
            
            const { data: books } = await supabase.from('Books').select()
            if(!books)
                return;
            console.log(books[0].title);

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
                    <div style={{ backgroundColor: book.color, transform: `rotate(${(Math.random() - 0.5) * 1.5}deg)`, marginTop: Math.random() * 10 + 5, width: (-Math.exp(3.5 - (0.1 * book.title.length)) + 100) + '%', height: Math.random() * 20 + 50 + 'px' }} key={index}
                        className={`group hover:ring-5 ring-offset-primary ring-0 ring-transparent hover:z-100 rounded-sm hover:ring-accent hover:ring-offset-4 transition-all duration-150 cursor-pointer flex flex-row items-center justify-between w-full gap-4 px-5`}>
                        <h2 className="text-3xl font-fancy font-bold text-left text-text">{book.title}</h2>
                        <p className="opacity-0 text-secondary group-hover:opacity-100 transition-opacity duration-300 text-center">Rating: {book.rating.composite}</p>
                        <p className="text-lg text-right text-text">{book.author}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}