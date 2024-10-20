import { useEffect, useState } from "react";
import Button from "./common/Button";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../assets/signin-image.jpg";
import { Apple, Facebook, Google } from "iconoir-react";
import { useAppDispatch, useAppSelector } from "./common/hooks";
import { login, updateIsPasswordNotValid, updateIsUserNotRegistered } from "./store/userSlice";
import { Type } from "./common/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { isLoggedIn, isPasswordNotValid, isUserNotRegistered } =
    useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isLoggedIn && !isPasswordNotValid && !isUserNotRegistered) navigate("/auctions");
  }, [isLoggedIn, isPasswordNotValid, isUserNotRegistered]);


  return (
    <div
      style={{
        padding: "16px 80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexFlow: "column", gap: "16px" }}>
        <div style={{ display: "flex", flexFlow: "column", gap: "4px" }}>
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Login</span>
          <span style={{ color: "grey" }}>
            Welcome back. Enter your credentials to access your account{" "}
          </span>
        </div>
        <div style={{ display: "flex", flexFlow: "column", gap: "4px" }}>
          <label htmlFor="email" style={{ fontWeight: "bold" }}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            style={{
              height: "20px",
              padding: "8px",
              border: `1px solid ${isUserNotRegistered ? "red" : "grey"}`,
              borderRadius: "4px",
            }}
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
                dispatch(updateIsUserNotRegistered(false));
            }}
          />
          {isUserNotRegistered && (
            <span
              style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}
            >
              Email Not Exists
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexFlow: "column", gap: "4px" }}>
          <label
            htmlFor="password"
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Password</span>
            <span style={{ color: "dodgerblue" }}>Forgot Password</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            style={{
              height: "20px",
              padding: "8px",
              border: `1px solid ${isPasswordNotValid ? "red" : "grey"}`,
              borderRadius: "4px",
            }}
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                dispatch(updateIsPasswordNotValid(false));
            }}
          />
          {isPasswordNotValid && (
            <span
              style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}
            >
              Password Not Correct
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          <input type="checkbox" id="rememberme" name="rememberme" />
          <label htmlFor="rememberme">Keep me signed in</label>
        </div>
        <div style={{ display: "flex", flexFlow: "column", gap: "4px" }}>
          <Button type={Type.primary} width="100%" onClick={handleSubmit}>
            Continue
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "grey",
            }}
          >
            <span
              style={{ height: "1px", width: "100px", backgroundColor: "grey" }}
            ></span>
            <span>or signup with</span>
            <span
              style={{ height: "1px", width: "100px", backgroundColor: "grey" }}
            ></span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <Button type={Type.default}>
              <Google height={16} /> Google
            </Button>
            <Button type={Type.default}>
              <Apple height={16} /> Apple
            </Button>
            <Button type={Type.default}>
              <Facebook height={16} /> Facebook
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>Don't have an acount?</span>{" "}
          <Link
            to="/signup"
            style={{ color: "dodgerblue", fontWeight: "bold" }}
          >
            Sign up here
          </Link>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px",
        }}
      >
        <img src={LoginImage} alt="loginimage" height={400} />
      </div>
    </div>
  );
};

export default Login;
