import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, comment }) => {
  const nav = useNavigate();
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/books")
      .then((res) => {
        console.log("All Books Response:", res.data);
        setBooks(res.data.books);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const addBook = (e) => {
    e.preventDefault();
    if (newBook.title && newBook.author) {
      axios
        .post("http://localhost:8080/api/books", newBook)
        .then((res) => {
          console.log("Book Response:", res.data);
          setBooks([...books, res.data.book]);
          setNewBook({ title: "", author: "" });
        })
        .catch((error) => {
          console.error("Error adding book:", error);
        });
    }
  };

  const viewBook = () => {
    nav("/book");
  };

  // const addComment = (id, comment) => {
  //   axios
  //     .put(`http://localhost:8080/api/books/${id}/comment`, { comment })
  //     .then((res) => {
  //       console.log("Comment Response:", res.data);
  //       setBooks(books.map((book) => (book._id === id ? res.data.book : book)));
  //       setComments({ ...comments, [id]: "" });
  //     })
  //     .catch((error) => {
  //       console.error("Error adding comment:", error);
  //     });
  // };

  return (
    <div className="library-dashboard">
      {console.log("user", user)}
      <div className="input-container">
        <div className="welcome-container">
          <h1 className="welcome-text">Welcome, {user?.username}!</h1>
          <p className="signout-link">
            <Link to="/">Sign out</Link>
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
          <div key={book._id} className="book-card">
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">by {book.author}</p>
            <p>Comments: {comment} </p>
            {/* <input
              type="text"
              placeholder="Add a comment"
              value={comments[book._id] || ""}
              onChange={(e) =>
                setComments({ ...comments, [book._id]: e.target.value })
              }
              className="comment-input"
            /> */}
            {/* <button
              onClick={() => addComment(book._id, comments[book._id])}
              className="add-button"
            >
              Add Comment
            </button> */}
            <button onClick={() => viewBook(book._id)} className="add-button">
              View Book
            </button>
            {book.comments.map((comment, index) => (
              <p key={index} className="comment-text">
                Comment: {comment.quote}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
