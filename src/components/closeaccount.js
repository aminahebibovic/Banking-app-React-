import React from 'react';
import '../styles.css';

const CloseAccount = ({ currentUser, onLogout }) => {
  const handleCloseAccount = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter(user => user.username !== currentUser);

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('currentUser');
    localStorage.removeItem('transactions');
    onLogout();
  };

  return (
    <div className="card red">
      <h3>Close Account</h3>
      <button onClick={handleCloseAccount}>→</button>
    </div>
  );
};

export default CloseAccount;
