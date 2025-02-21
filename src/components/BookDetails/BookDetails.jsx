import { useState, useEffect } from 'react';
import * as bookService from '../../services/bookService';
import { useParams } from "react-router-dom";
import ReviewForm from '../ReviewForm/ReviewForm';

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

    const handleAddReview = async (reviewFormData) => {
      const newReview = await bookService.createReview(bookId, reviewFormData);
      setBook({ ...book, reviews: [...book.reviews, newReview] });
    };

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
            <h2>Reviews</h2>
            <ReviewForm handleAddReview={handleAddReview}/>
            {!book.reviews?.length && <p>There are no reviews.</p>}
            {book.reviews?.map((review) => (
              <article key={review._id}>
                <header>
                  <p>
                    {`${review.author?.username || 'Unknown'} posted on
                    ${new Date(review.createdAt).toLocaleDateString()}`}
                    </p>
                </header>
                <p>{review.text}</p>
              </article>
            ))}
          </section>
        </main>
    );
};

export default BookDetails;
