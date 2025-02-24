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
    <div className="landing-body container">
      <div className="landing-container text-center my-4">
        <h1 className="landing-title display-4">Welcome to Our Book Collection</h1>
        <h2 className="landing-description lead text-muted">
          Discover amazing books and track your favorite reads.
        </h2>
      </div>

      {/* Book Covers Section */}
      <div className="book-covers-container d-flex justify-content-center overflow-auto py-4">
        <div className="book-covers-scroll d-flex gap-3">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book._id} className="book-item text-center">
                <div className="book-content">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="book-cover img-fluid rounded shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <h3 className="book-title mt-2">{book.title}</h3>
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
