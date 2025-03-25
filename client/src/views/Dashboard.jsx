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
    // IIFE - Immediately Invoked Function Expression
    // (async()=> {
    //   await axios
    //   .get("http://localhost:8080/api/books")
    //   .then((res) => {
    //     console.log("All Books Response:", res.data);
    //     setBooks(res.data.books);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching books:", error);
    //   });
    // })()

    const getBooks = async () => {
      await axios
        .get("http://localhost:8080/api/books")
        .then((res) => {
          console.log("All Books Response:", res.data);
          setBooks(res.data.books);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    };

    getBooks();
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

  const viewBook = (e) => nav(`/books/${e.target.id}`);

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
      <ul className="book-list">
        {/* map through all books, display them, have the ability to select a specific book */}
        {books.map((book) => (
          <li key={`dashboard-${book._id}`} id={book._id} onClick={viewBook}>
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
