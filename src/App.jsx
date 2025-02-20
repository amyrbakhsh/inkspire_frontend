import { Routes, Route } from 'react-router-dom'
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

import BookDetails from './components/BookDetails/BookDetails'


const App = () => {
  
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
        <Route path='/books' element={<BookList books={books} />} />
        <Route path='/books/:bookId' element={<BookDetails />} />
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
      </Routes>
    </>
  )
}

export default App
