import { Link } from 'react-router-dom';
import styles from './BookList.module.css'; // Importing CSS module

const BookList = ({ books }) => {
  return (
    <main className={styles.bookList}>
      <div className={styles.bookGrid}>
        {books.map((book) => (
          <div key={book._id} className={styles.bookItem}>
            <Link to={`/books/${book._id}`} className={styles.bookLink}>
              <div className={styles.card}>
                <img
                  src={book.image}
                  alt={book.title}
                  className={styles.bookImage}
                  referrerPolicy="no-referrer"
                />
                <div className={styles.cardBody}>
                  <h5 className={styles.bookTitle}>{book.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default BookList;
