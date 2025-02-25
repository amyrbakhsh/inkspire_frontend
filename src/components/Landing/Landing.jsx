import React, { useState, useEffect } from "react";
import * as bookService from "../../services/bookService"; // Fetch books from backend

const Landing = () => {
  // Store books in state
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await bookService.index(); // Fetch books from backend
      setBooks(booksData);
    };
    fetchBooks();
  }, []);
  
  return (
    <div className="landing-body">
      <div className="landing-container">
        <h1 className="landing-title">Welcome to Our Book Collection</h1>
        <h2 className="landing-description">
          Discover amazing books and track your favorite reads.
        </h2>
      </div>
      <div className="book-covers-container">
        <div className="book-covers-scroll">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book._id} className="book-item">
                <div className="book-content">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="book-cover"
                    referrerPolicy="no-referrer"
                  />
                  <h3 className="book-title">{book.title}</h3>
                </div>
              </div>
            ))
          ) : (
            <p>No books available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
