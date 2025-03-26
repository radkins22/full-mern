import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import Comment from "../Components/Comment";
import "./dashboard.css";

const Book = () => {
  const user = useAuth();
  const nav = useNavigate();
  const { _id } = useParams();
  // book by id state vars
  const [book, setBook] = useState({});
  const [comments, setComments] = useState([]);
  // form inputs state vars
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const getBook = async () => {
      await axios
        .get(`http://localhost:8080/api/books/${_id}`)
        .then((res) => {
          const { msg, book, Error } = res.data;
          if (msg === "Success") {
            console.log(book);
            setBook(book);
            setComments(book.comments);
          } else toast.warning(Error);
        })
        .catch((error) => {
          console.error("There was an error fetching the book data!", error);
        });
    };
    getBook();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const { _id: userId, username } = user;
    const data = { ...formData, userId, username };
    console.log(data);
    axios({
      method: "PUT",
      url: `http://localhost:8080/api/books/${_id}/addComment`,
      data,
      withCredentials: true,
    })
      .then((res) => {
        console.log("Comment Response:", res.data);
        setBook(res.data.book);
        setComments(res.data.book.comments);
      })
      .catch((error) => {
        console.error("There was an error submitting the comment!", error);
      });
  };

  const handleBackClick = () => nav("/dashboard");

  if (!book) return <div>Loading...</div>;

  return (
    <div className="library-dashboard">
      <h1>{book?.title}</h1>
      <h2>by {book?.author}</h2>
      <button className="add-button" onClick={handleBackClick}>
        Back to Dashboard
      </button>
      <div>
        <h3>Add Comment Form</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            placeholder="Leave a comment"
          />
          <input type="submit" className="add-button" value="Submit" />
        </form>
      </div>
      <h3>Comments</h3>
      <div className="comment-container">
        {comments?.map((comment) => (
          <Comment
            key={comment._id}
            commentObj={comment}
            ant={7}
            rachael={["a", "b", "c"]}
          />
        ))}
      </div>
    </div>
  );
};

export default Book;
