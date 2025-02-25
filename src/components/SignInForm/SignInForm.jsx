import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import styles from './SignInForm.module.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.formSection}>
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          {message && <p className={styles.errorMessage}>{message}</p>}
          <div className={styles.formGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitBtn}>Sign In</button>
            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/')}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignInForm;
