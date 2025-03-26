import axios from "axios";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";

const Comment = (props) => {
  console.log(props);
  // { bookId, comment, setBook, setComments }
  const handleDelete = async () => {
    //     const { _id } = comment;
    //     try {
    //       const res = await axios({
    //         method: "DELETE",
    //         data: { bookId },
    //         withCredentials: true,
    //         url: `http://localhost:8080/api/comments/${_id}`,
    //       });
    //       const { msg, book, Error } = res.data;
    //       if (msg === "Success") {
    //         setBook(book);
    //         setComments(book.comments);
    //         toast.success("Comment deleted.");
    //       } else {
    //         toast.warning(Error);
    //       }
    //     } catch (err) {
    //       toast.warning(err.message);
    //     }
  };

  return (
    <div className="quote-card">
      <button className="btn btn-sm" onClick={handleDelete}>
        <FaRegTrashAlt />
      </button>
      {/* <div className="quote">&quot;{comment.quote}&quot;</div> */}
      {/* <div className="quote">{`" ${comment.quote} "`}</div> */}
      {/* <div className="uname"> ~ {comment.username} ~ </div> */}
      {/* <div className="uname">{` · ${comment.username} · `}</div> */}
    </div>
  );
};

export default Comment;
