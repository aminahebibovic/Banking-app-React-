import React, { useState, useEffect } from 'react';
import TransferMoney from './transfermoney';
import RequestLoan from './requestloan';
import CloseAccount from './closeaccount';
import TransactionHistory from './transactionhistory';
import '../styles.css';

const Dashboard = ({ currentUser, onLogout }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === currentUser);
    if (user) {
      setBalance(user.balance || 0);
    }

    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Filtriraj transakcije samo za trenutnog korisnika
    const userTransactions = storedTransactions.filter(transaction => 
      transaction.sender === currentUser || transaction.receiver === currentUser
    );

    // Sortiraj transakcije od najnovije ka najstarijoj
    userTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    setTransactions(userTransactions);
  }, [currentUser]);

  const updateBalance = (newBalance) => setBalance(newBalance);

  const addTransaction = (description, amount, sender, receiver) => {
    const newTransaction = {
      description,
      amount,
      sender,
      receiver,
      date: new Date().toISOString() // Dodaj datum
    };

    // Dodaj novu transakciju u Local Storage
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const updatedTransactions = [newTransaction, ...storedTransactions];

    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

    setTransactions(updatedTransactions);
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome back, {currentUser}!</h1>
      <h2>Current balance: €{balance.toFixed(2)}</h2>

      <TransferMoney currentUser={currentUser} updateBalance={updateBalance} addTransaction={addTransaction} />
      <RequestLoan currentUser={currentUser} updateBalance={updateBalance} addTransaction={addTransaction} />
      <CloseAccount currentUser={currentUser} onLogout={onLogout} />

      <TransactionHistory transactions={transactions} />

      <button className="logout-button" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
