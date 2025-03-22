import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./dashboard.css";

const Book = () => {
const nav = useNavigate();
const { id } = useParams();
const [book, setBook] = useState("");
const [comment, setComment] = useState("");
const [comments, setComments] = useState([]);

useEffect(() => {
axios
    .get(`/api/books/${id}`)
    .then((res) => {
        setBook(res.data);
        setComments(res.data.comments || []);
    })
    .catch((error) => {
        console.error("There was an error fetching the book data!", error);
    });
}, [id]);

const handleCommentSubmit = (e) => {
  e.preventDefault();
  axios
    .post(`/api/books/${id}/comments`, { comment })
    .then((res) => {
      setComments([...comments, res.data]);
      setComment("");
    })
    .catch((error) => {
      console.error("There was an error submitting the comment!", error);
    });
};

const handleBackClick = () => {
  nav("/dashboard");
};

if (!book) {
  return <div>Loading...</div>;
}

  return (
    <div className="library-dashboard">
      <h1>{book.title}</h1>
      <h2>by {book.author}</h2>
      <button className="add-button" onClick={handleBackClick}>Back to Dashboard</button>
      <div>
        <h3>Comments</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a comment"
          />
        </form>
          <button className="add-button" type="submit">Submit</button>
      </div>
    </div>
  );
};

export default Book;
