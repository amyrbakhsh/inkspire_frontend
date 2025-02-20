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
      throw new Error('Failed to fetch book');
    }

    return res.json();
  } catch (error) {
    console.log('Error fetching book:', error);
    // Returning null in case of an error
    return null;
  }
};

export {
  index,
  show,
};
