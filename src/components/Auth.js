import React, { useState } from 'react';
import '../styles.css';

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  // Funkcija za login
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      onLogin(username);
      setError('');
    } else {
      setError('Invalid username or password.');
    }
  };

  // Funkcija za registraciju
  const handleRegister = () => {
    if (username && password) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const existingUser = users.find(user => user.username === username);

      if (existingUser) {
        setError('Username already exists.');
        return;
      }

      // Novi korisnik sa pocetnim saldom od 5000 EUR
      const newUser = {
        username,
        password,
        balance: 5000, // Početni saldo za novog korisnika
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      setUsername('');
      setPassword('');
      setError('');

      setIsRegistering(false);
    } else {
      setError('Please fill all fields.');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isRegistering ? (
        <button onClick={handleRegister}>Register</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      <p className="error">{error}</p>
      <p>
        {isRegistering ? (
          <>
            Already have an account?{' '}
            <span onClick={() => setIsRegistering(false)} style={{ color: 'blue', cursor: 'pointer' }}>
              Login here
            </span>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <span onClick={() => setIsRegistering(true)} style={{ color: 'blue', cursor: 'pointer' }}>
              Register here
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default Auth;
