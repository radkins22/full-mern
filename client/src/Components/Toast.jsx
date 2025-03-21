import { ToastContainer, Slide, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      theme="light"
      // transition={Slide}
      // transition={Flip}
      transition={Bounce}
    />
  );
};

export default Toast;
