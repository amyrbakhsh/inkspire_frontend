import { useState, useEffect } from 'react';
import * as bookService from '../../services/bookService';
import { useParams } from "react-router-dom";

const BookDetails = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookData = await bookService.show(bookId);
                setBook(bookData);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };
        fetchBook();
    }, [bookId]);

    if (!book) return <main>Loading...</main>;

    return (
        <main>
          <section>
            <header>
              <p>{book.category?.toUpperCase()}</p>
              <h1>{book.title}</h1>
              <p>
                {`${book.owner?.username || 'Unknown'} posted on
                ${new Date(book.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{book.description}</p>
          </section>
          <section>
            <h2>Comments</h2>
            {!book.comments?.length && <p>There are no comments.</p>}
            {book.comments?.map((comment) => (
              <article key={comment._id}>
                <header>
                  <p>{`${comment.author?.username || 'Unknown'} posted on ${new Date(comment.createdAt).toLocaleDateString()}`}</p>
                </header>
                <p>{comment.text}</p>
              </article>
            ))}
          </section>
        </main>
    );
};

export default BookDetails;
