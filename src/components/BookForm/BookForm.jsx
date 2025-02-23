// src/components/BookForm/BookForm.jsx

import { useState } from 'react';

const BookForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
  });
  const [ image, setImage ] = useState(null);
  const [ imageUrl, setImageUrl] = useState('');

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleFileChange = (evt) => {
    setFormData({ ...formData, image: evt.target.files[0] });
  };



  const handleSubmit = (evt) => {
    evt.preventDefault();

    const data = new FormData()

    data.append('title', formData.title)
    data.append('description', formData.description)
    data.append('category', formData.category)

    data.append('image', formData.image)

    props.handleAddBook(data);
  };

  return (
    <main>
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
        <label htmlFor='description-input'>description</label>
        <textarea
          required
          type='text'
          name='description'
          id='description-input'
          value={formData.text}
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
          <option disabled selected value> -- select an option -- </option>
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
            required
            type="file"
            name="image"
            id="image-input"
            onChange={handleFileChange}
            accept='image/*'
        />
        <button type='submit'>SUBMIT</button>
      </form>
      {imageUrl && <img src={imageUrl} alt='Uploaded image'/>}
    </main>
  );
};

export default BookForm;
