import { Routes, Route, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import Landing from './components/Landing/Landing'
import SignInForm from './components/SignInForm/SignInForm'
import Dashboard from './components/Dashboard/Dashboard'
import BookList from './components/BookList/BookList'

import * as bookService from './services/bookService'
import { useState, useEffect } from 'react'

import { UserContext } from './contexts/UserContext'

import BookDetails from './components/BookDetails/BookDetails'; 

import BookForm from './components/BookForm/BookForm';

const App = () => {
  const navigate = useNavigate();

  const handleDeleteBook = async (bookId) => {
    const deletedBook = await bookService.deleteBook(bookId);
    setBooks(books.filter((book) => book._id !== deletedBook._id));
    navigate('/books');
  };

  const handleAddBook = async (bookFormData) => {
    const newBook = await bookService.create(bookFormData);
    setBooks([newBook, ...books]);
    navigate('/books');

  };

  const handleUpdateBook = async (bookId, bookFormData) => {
    try {
      const updatedBook = await bookService.update(bookId, bookFormData);
      if (!updatedBook) {
        throw new Error('Failed to update book');
      }
      setBooks(books.map((book) => (book._id === bookId ? updatedBook : book)));
      navigate(`/books/${bookId}`);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };


  
  const { user } = useContext(UserContext)
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchAllBooks = async () => {
      const booksData = await bookService.index()
      setBooks(booksData)
    }
    if (user) fetchAllBooks()
  }, [user])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/books/new' element={<BookForm handleAddBook={handleAddBook} />} />
        <Route path='/books' element={<BookList books={books} />} />
        <Route path='/books/:bookId' element={<BookDetails handleDeleteBook={handleDeleteBook} />} /> 
        <Route path='/books/:bookId/edit' element={<BookForm handleUpdateBook={handleUpdateBook} />} />
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
      </Routes>
    </>
  )
}

export default App
