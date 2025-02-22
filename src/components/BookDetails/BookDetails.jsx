import { useState, useEffect, useContext } from 'react';
import * as bookService from '../../services/bookService';
import { useParams } from "react-router-dom";
import ReviewForm from '../ReviewForm/ReviewForm';
import { UserContext } from '../../contexts/UserContext';
import PropTypes from 'prop-types';

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
          {book.owner._id === user._id && <button onClick={handleDeleteBook}>Delete</button>}
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

BookDetails.propTypes = {
  handleDeleteBook: PropTypes.func.isRequired,
};

export default BookDetails;
