import React from 'react';
import '../styles.css';

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="card transaction-history">
      <h3>Transaction History</h3>
      <ul>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <li key={index} className={transaction.sender === "Bank" ? "deposit" : "withdrawal"}>
              <strong>{transaction.description}</strong> <br />
              <span>From: {transaction.sender} </span><br />
              <span>To: {transaction.receiver} </span><br />
              <span>Amount: €{transaction.amount}</span><br />
              <span className="transaction-date">Date: {new Date(transaction.date).toLocaleString()}</span>
            </li>
          ))
        ) : (
          <p>No transactions yet.</p>
        )}
      </ul>
    </div>
  );
};

export default TransactionHistory;
