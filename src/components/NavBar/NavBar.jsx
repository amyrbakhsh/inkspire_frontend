import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styles from './NavBar.module.css'; // Import CSS Module

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link className={styles.logo} to="/">📚 Inkspire</Link>

        <div className={styles.navLinks}>
          <Link className={styles.navItem} to="/">Home</Link>
          <Link className={styles.navItem} to="/books">Books</Link>

          {user ? (
            <>
              <span className={styles.navText}>Welcome, {user.username}</span>
              <Link className={styles.navItem} to="/books/new">Add a Book</Link>
              <Link className={styles.navItem} to="/" onClick={handleSignOut}>Sign Out</Link>
            </>
          ) : (
            <>
              <Link className={styles.navItem} to="/sign-up">Sign Up</Link>
              <Link className={styles.navItem} to="/sign-in">Sign In</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

