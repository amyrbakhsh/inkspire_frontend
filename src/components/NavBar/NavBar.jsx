import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Book Collection</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto"> {/* ms-auto to align items to the right */}
            {user ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text">Welcome, {user.username}</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleSignOut}>Sign Out</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Landing</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/books">Books</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/books/new">Add a Book</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-up">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-in">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
