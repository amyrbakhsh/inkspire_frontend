import PropTypes from 'prop-types';
import { Link } from 'react-router';

const BookList = ({ books }) => {
  return (
    <main>
      {books.map((book) => (
        <Link key={book._id} to={`/books/${book._id}`}>
          <article>
            <header>
              <h2>{book.title}</h2>
              <p>
                {`${book.owner?.username || 'Unknown'} posted on 
                ${new Date(book.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{book.description}</p>  
          </article>
        </Link>
      ))}
    </main>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,  
      owner: PropTypes.shape({
        username: PropTypes.string, 
      }),
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BookList;
