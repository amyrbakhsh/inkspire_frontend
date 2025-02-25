import React, { useState, useEffect } from "react"; 
import * as bookService from "../../services/bookService"; 
import styles from "./Landing.module.css"; // Import CSS Module

const Landing = () => {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await bookService.index();
      setBooks(booksData);
    };
    fetchBooks();
  }, []);
  
  return (
    <div className={styles.landingBody}>
      <div className={styles.landingContainer}>
        <h1 className={styles.landingTitle}>Welcome to Our Book Collection</h1>
        <h2 className={styles.landingDescription}>
          Discover amazing books and track your favorite reads.
        </h2>
      </div>
      <div className={styles.bookGrid}>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className={styles.bookCard}>
              <img
                src={book.image}
                alt={book.title}
                className={styles.bookCover}
                referrerPolicy="no-referrer"
              />
              <h3 className={styles.bookTitle}>{book.title}</h3>
            </div>
          ))
        ) : (
          <p className={styles.noBooks}>No books available</p>
        )}
      </div>
    </div>
  );
};

export default Landing;
