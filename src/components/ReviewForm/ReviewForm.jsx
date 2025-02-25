import { useState } from 'react';
import styles from "./ReviewForm.module.css"; // Import CSS Module

const ReviewForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddReview(formData);
    setFormData({ text: '' });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor='text-input'>Add a Review:</label>
        <textarea
          required
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />
        <button type='submit'>Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
