import { useState, useEffect, useContext } from 'react';
import * as bookService from '../../services/bookService';
import { useParams, Link, useNavigate } from "react-router-dom";
import ReviewForm from '../ReviewForm/ReviewForm';
import { UserContext } from '../../contexts/UserContext';
import styles from './BookDetails.module.css';

const BookDetails = (props) => {
    const { bookId } = useParams();
    const { user } = useContext(UserContext);
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    const handleDeleteBook = async () => {
        try {
            await bookService.deleteBook(bookId);
            props.setTrigger(!props.trigger);
            navigate('/books');
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookData = await bookService.show(bookId);
                if (!bookData) {
                    console.error('Book not found');
                    return;
                }
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
        <main className={styles.container}>
            <section className={styles.bookDetails}>
                <header>
                    <p>{book.category?.toUpperCase()}</p>
                    <h1>{book.title}</h1>
                    <img src={book.image} alt={book.title} referrerPolicy="no-referrer" className={styles.bookImage} />
                    <div className={styles.bookMeta}>
                        <p>
                            {`${book.owner?.username || 'Unknown'} posted on
                            ${new Date(book.createdAt).toLocaleDateString()}`}
                        </p>
                        {book.owner._id === user._id && (
                            <div className={styles.bookActions}>
                                <Link to={`/books/${bookId}/edit`} className={styles.editButton}>Edit</Link>
                                <button onClick={handleDeleteBook} className={styles.deleteButton}>Delete</button>
                            </div>
                        )}
                    </div>
                </header>
                <p className={styles.bookDescription}>{book.description}</p>
            </section>

            <section className={styles.reviewSection}>
                <h2>Reviews</h2>
                <ReviewForm handleAddReview={handleAddReview} />
                <div className={styles.reviewContainer}>
                    {!book.reviews?.length && <p>No reviews available.</p>}
                    {book.reviews?.map((review) => (
                        <article key={review._id} className={styles.reviewItem}>
                            <header>
                                <div className={styles.reviewMeta}>
                                    <p>
                                        {`${review.reviewer?.username || 'Unknown'} posted on
                                        ${new Date(review.createdAt).toLocaleDateString()}`}
                                    </p>
                                    {review.owner?._id === user._id && (
                                        <div className={styles.reviewActions}>
                                            <Link to={`/books/${bookId}/reviews/${review._id}/edit`} className={styles.editReviewButton}>Edit</Link>
                                            <button onClick={() => handleDeleteReview(review._id)} className={styles.deleteReviewButton}>Delete</button>
                                        </div>
                                    )}
                                </div>
                            </header>
                            <p className={styles.reviewText}>{review.text}</p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default BookDetails;

