import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./hooks";
import { updateIsLoggedIn } from "../store/userSlice";

const useAuthorize = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5100/api/auth/verify", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          dispatch(updateIsLoggedIn(true));
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
};

export default useAuthorize;
