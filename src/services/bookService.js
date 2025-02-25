const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/books`;

// Fetch all books
const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    // Check if the response is successful
    if (!res.ok) {
      throw new Error('Failed to fetch books');
    }

    return res.json();
  } catch (error) {
    console.log('Error fetching books:', error);
    // Returning an empty array in case of an error
    return [];
  }
};

// Fetch a single book by its ID
const show = async (bookId) => {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    // Check if the response is successful
    if (!res.ok) {
      console.error('Failed to fetch book:', res.statusText);
      return null; // Return null if the book cannot be fetched
    }

    return res.json();
  } catch (error) {
    console.log('Error fetching book:', error);
    // Returning an empty object in case of an error
    return {};
  }
};

const create = async (bookFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        // 'Content-Type': 'application/json',
      },
      body: bookFormData,
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createReview = async (bookId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}/reviews`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// DELETE Review Function
const deleteReview = async (bookId, reviewId) => {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to delete review');
    }

    return res.json();
  } catch (error) {
    console.log('Error deleting review:', error);
  }
};

//deleteBook function
const deleteBook = async (bookId) => {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log('Error deleting book:', error);
  }
};

// Update an existing book
const update = async (bookId, bookFormData) => {
  try {

    const res = await fetch(`${BASE_URL}/${bookId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: bookFormData, 
    });
    return res.json();
  } catch (error) {
    console.log('Error updating book:', error);
  }
};

export {
  index,
  show,
  create,
  createReview,
  update,
  deleteBook,
  deleteReview
};
