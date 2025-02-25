import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as bookService from '../../services/bookService';
import { UserContext } from '../../contexts/UserContext';
import styles from "./BookForm.module.css"; // Import new styles

const BookForm = (props) => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
  });
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      if (bookId) {
        const bookData = await bookService.show(bookId);
        if (!bookData || bookData.owner._id !== user._id) {
          navigate(-1);
          return;
        }
        setFormData({
          title: bookData.title,
          description: bookData.description,
          category: bookData.category,
          image: '',
        });
        setImageUrl(bookData.image);
      } else {
        setFormData({
          title: '',
          description: '',
          category: '',
          image: '',
        });
      }
    };
    fetchBook();
  }, [bookId, user._id]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleFileChange = (evt) => {
    setFormData({ ...formData, image: evt.target.files[0] });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);

    if (formData.image) {
      data.append('image', formData.image);
    }
  
    if (bookId) {
      props.handleUpdateBook(bookId, data);
    } else {
      props.handleAddBook(data);
    }
  
    navigate('/books');
  };

  return (
    <main className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{bookId ? 'Edit Book' : 'New Book'}</h1>

        {bookId && !formData.title && <p>Loading book details...</p>}
        {bookId && !formData.title && <p>Book not found.</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor='title-input'>Title</label>
          <input
            required
            type='text'
            name='title'
            id='title-input'
            value={formData.title}
            onChange={handleChange}
          />
          
          <label htmlFor='description-input'>Description</label>
          <textarea
            required
            name='description'
            id='description-input'
            value={formData.description}
            onChange={handleChange}
          />

          <label htmlFor='category-input'>Category</label>
          <select
            required
            name='category'
            id='category-input'
            value={formData.category}
            onChange={handleChange}
          >
            <option disabled value=""> -- select an option -- </option>
            <option value='Fantasy'>Fantasy</option>
            <option value='Horror'>Horror</option>
            <option value='Science fiction'>Science fiction</option>
            <option value='Thriller'>Thriller</option>
            <option value='Mystery'>Mystery</option>
            <option value='Biography'>Biography</option>
            <option value='Graphic novel'>Graphic novel</option>
          </select>

          <label htmlFor="image-input">Image</label>
          <input
            type="file"
            name="image"
            id="image-input"
            onChange={handleFileChange}
            accept='image/*'
          />

          {imageUrl && !formData.image && (
            <img src={imageUrl} alt='Current book' referrerPolicy="no-referrer"/>
          )}

          <button type='submit'>{bookId ? 'Update Book' : 'Add Book'}</button>
        </form>
      </div>
    </main>
  );
};

export default BookForm;
