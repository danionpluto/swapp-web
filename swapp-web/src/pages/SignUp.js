import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase.js";
import { useNavigate } from 'react-router-dom';


function SignUp() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to another page or perform other actions after successful sign-up
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="email">First Name:</label>
          <input type="firstname" id="firstname" value={firstname} onChange={e => setFirstName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Last Name:</label>
          <input type="lastname" id="lastname" value={lastname} onChange={e => setLastName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;