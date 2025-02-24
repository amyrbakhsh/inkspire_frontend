import { useState, useEffect, useContext } from 'react';
import * as bookService from '../../services/bookService';
import { useParams, Link } from "react-router-dom";
import ReviewForm from '../ReviewForm/ReviewForm';
import { UserContext } from '../../contexts/UserContext';

const BookDetails = (props) => {
    const { bookId } = useParams();
    const { user } = useContext(UserContext);
    const [book, setBook] = useState(null);

    const handleDeleteBook = () => {
      props.handleDeleteBook(bookId);
    };

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

    // **New function to delete a review**
    const handleDeleteReview = async (reviewId) => {
      try {
        await bookService.deleteReview(bookId, reviewId);
        setBook({ 
          ...book, 
          reviews: book.reviews.filter(review => review._id !== reviewId)
        });
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    };

    return (
        <main>
          <section>
            <header>
              <p>{book.category?.toUpperCase()}</p>
              <h1>{book.title}</h1>
              <img src={book.image} alt={book.title} referrerPolicy="no-referrer" />
              <p>
                {`${book.owner?.username || 'Unknown'} posted on
                ${new Date(book.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{book.description}</p>
          </section>
          {book.owner._id === user._id && <Link to={`/books/${bookId}/edit`}>Edit</Link>}
          {book.owner._id === user._id && <button onClick={handleDeleteBook}>Delete</button>}
          <section>
            <h2>Reviews</h2>
            <ReviewForm handleAddReview={handleAddReview}/>
            {!book.reviews?.length && <p>There are no reviews.</p>}
            {book.reviews?.map((review) => (
              <article key={review._id}>
                <header>
                  <p>
                    {`${review.reviewer?.username || 'Unknown'} posted on
                    ${new Date(review.createdAt).toLocaleDateString()}`}
                  </p>
                </header>
                <p>{review.text}</p>
                {review.owner._id === user._id && (
                  <button onClick={() => handleDeleteReview(review._id)}>Delete Review</button>
                )}
              </article>
            ))}
          </section>
        </main>
    );
};

export default BookDetails;