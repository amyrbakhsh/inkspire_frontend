// src/components/ReviewForm/ReviewForm.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as bookService from '../../services/bookService';

const ReviewForm = (props) => {
  const { bookId, reviewId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ text: '' });

  // Fetch review data if editing
  useEffect(() => {
    const fetchReview = async () => {
      if (bookId && reviewId) {
        const bookData = await bookService.show(bookId);
        const review = bookData.reviews.find((rev) => rev._id === reviewId);
        if (review) setFormData({ text: review.text });
      }
    };
    fetchReview();
  }, [bookId, reviewId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
    if (bookId && reviewId) {
      await bookService.updateReview(bookId, reviewId, formData);
      navigate(`/books/${bookId}`);
    } else {
      props.handleAddReview(formData);
    }
    
    setFormData({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>{reviewId ? 'Edit' : 'Add'} Review:</label>
      <textarea
        required
        type='text'
        name='text'
        id='text-input'
        value={formData.text}
        onChange={handleChange}
      />
      <button type='submit'>{reviewId ? 'Update' : 'Submit'} Review</button>
    </form>
  );
};

export default ReviewForm;