import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./dashboard.css";

const Book = ({ user }) => {
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
            setBook(book);
            // setComments(res.data.comments || []);
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
      // .post(`/api/books/${id}/comments`, { comment })
      .then((res) => {
        // setComments([...comments, res.data]);
        // setComment("");
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
        <h3>Comments</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
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
    </div>
  );
};

export default Book;
