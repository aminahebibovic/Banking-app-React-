import React, { useState } from 'react';
import '../styles.css';

const TransferMoney = ({ currentUser, updateBalance, addTransaction }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleTransfer = () => {
    if (recipient && amount > 0) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const sender = users.find(user => user.username === currentUser);
      const receiver = users.find(user => user.username === recipient);

      if (!receiver) {
        setError('Recipient not found.');
        return;
      }
      if (sender.balance < amount) {
        setError('Insufficient funds.');
        return;
      }

      // Update balances
      sender.balance -= Number(amount);
      receiver.balance += Number(amount);
      localStorage.setItem('users', JSON.stringify(users));
      updateBalance(sender.balance);

      // Dodaj transakciju kroz funkciju addTransaction
      addTransaction("Transfer Money", Number(amount), currentUser, recipient);

      setRecipient('');
      setAmount('');
      setError('');
    } else {
      setError('Please fill all fields.');
    }
  };

  return (
    <div className="card yellow">
      <h3>Transfer Money</h3>
      <input type="text" placeholder="Transfer to" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleTransfer}>→</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TransferMoney;
