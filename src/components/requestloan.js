import React, { useState, useEffect } from 'react';
import '../styles.css';

const RequestLoan = ({ currentUser, updateBalance, addTransaction }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [maxLoan, setMaxLoan] = useState(0);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === currentUser);

    if (user) {
      const calculatedMaxLoan = user.balance * 0.3; // Maksimalno 30% od balansa
      setMaxLoan(calculatedMaxLoan);
    }
  }, [currentUser]);

  const handleRequest = () => {
    if (amount > 0 && amount <= maxLoan) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.username === currentUser);

      if (user) {
        user.balance += Number(amount);
        localStorage.setItem('users', JSON.stringify(users));
        updateBalance(user.balance);

        addTransaction("Loan Request", Number(amount), "Bank", currentUser);

        setAmount('');
        setError('');
      }
    } else {
      setError(`You can request up to €${maxLoan.toFixed(2)}.`);
    }
  };

  return (
    <div className="card green">
      <h3>Request Loan (Max: €{maxLoan.toFixed(2)})</h3>
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleRequest}>→</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RequestLoan;
