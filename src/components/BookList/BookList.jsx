import { Link } from 'react-router';

const BookList = ({ books }) => {
  return (
    <main>
      {books.map((book) => (
        
        <Link key={book._id} to={`/books/${book._id}`}>

          <article>
            <header>
              <h2>{book.title}</h2>
              <img src={book.image} alt={book.title} referrerpolicy="no-referrer"/>
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


export default BookList;
