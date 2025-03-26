import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (link = "") => {
  const nav = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      // axios({}).then().catch();
      try {
        const res = await axios({
          method: "GET",
          url: "http://localhost:8080/api/users/auth",
          withCredentials: true,
        });
        if (!res.data.user) {
          return nav(`/${link}`);
        } else {
          setUser(res.data.user);
          // return res.data.user;
        }
      } catch (err) {
        console.log(err);
        return nav(`/${link}`);
      }
    })(); // IIFE (Immediately Invoked Function Expression) to allow async/await
  }, [link, nav]);

  return user;
};

export default useAuth;
