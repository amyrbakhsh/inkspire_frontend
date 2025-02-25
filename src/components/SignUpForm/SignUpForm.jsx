import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Fixed import here
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import './SignUpForm.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="signup-container">
      <h1 className="signup-heading">Sign Up</h1>
      {message && <p className="message-box">{message}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          {/* Input comes before label for the floating effect */}
          <input
            className="form-input"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder=" " // Blank placeholder required for :placeholder-shown
            required
          />
          <label className="form-label" htmlFor="username">
            Username:
          </label>
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label className="form-label" htmlFor="password">
            Password:
          </label>
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="password"
            id="passwordConf"
            name="passwordConf"
            value={passwordConf}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label className="form-label" htmlFor="passwordConf">
            Confirm Password:
          </label>
        </div>

        <div className="button-group">
          <button className="submit-btn" disabled={isFormInvalid()}>
            Sign Up
          </button>
          <button
            className="cancel-btn"
            type="button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;
