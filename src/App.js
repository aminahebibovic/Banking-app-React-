import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import './styles.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
    }
  }, []);

  const handleLogin = (username) => {
    setCurrentUser(username);
    localStorage.setItem('currentUser', username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <div className="App">
      {!currentUser ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <Dashboard currentUser={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
  
}

export default App;
