import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [comments, setComments] = useState({});

  useEffect(() => {
    if (user) {
      setBooks(user.books || []);
    }
  }, [user]);

  const addBook = () => {
    if (newBook.title && newBook.author) {
      setBooks([...books, { ...newBook, id: Date.now() }]);
      setNewBook({ title: "", author: "" });
    }
  };

  const addComment = (id, comment) => {
    setComments({ ...comments, [id]: comment });
  };

  return (
    <div className="library-dashboard">
      <div className="input-container">
        <div className="welcome-container">
          <h1 className="welcome-text">Welcome, {user?.username}!</h1>
          <p className="signout-link">
            <Link to="/login">Sign out</Link>
          </p>
        </div>
        <h2 className="add-book-title">Add a Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="input-field"
        />
        <button onClick={addBook} className="add-button">
          Add Book
        </button>
      </div>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">by {book.author}</p>
            <input
              type="text"
              placeholder="Add a comment"
              onChange={(e) => addComment(book.id, e.target.value)}
              className="comment-input"
            />
            {comments[book.id] && (
              <p className="comment-text">Comment: {comments[book.id]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
