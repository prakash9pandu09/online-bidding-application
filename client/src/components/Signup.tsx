import { useState } from "react";
import Button from "./common/Button";
import { Type } from "./common/types";
import { Link, useNavigate } from "react-router-dom";
import SignUpImage from "../assets/signup-image.jpg";
import { Apple, Facebook, Google } from "iconoir-react";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserExists, setIsUserExists] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post("http://localhost:5100/api/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      }, {
        withCredentials: true
      })
      .then((res) => {
        if(res.data.success) navigate('/signupsuccess');
        if(!res.data.success && res.data.status === 409) {
            setIsUserExists(true);
        }
      })
      .catch((err) => console.log(err));
  };

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
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Sign up</span>
          <span style={{ color: "grey" }}>
            New bidders, as soon as you have submitted your information you will
            be eligible to bid in the auction.
          </span>
        </div>
        <div style={{ display: "flex", flexFlow: "column", gap: "4px" }}>
          <label htmlFor="firstname" style={{ fontWeight: "bold" }}>
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            style={{ height: "20px", padding: "8px", border: '1px solid grey', borderRadius: "4px" }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", flexFlow: "column", gap: "4px" }}>
          <label htmlFor="lastname" style={{ fontWeight: "bold" }}>
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            style={{ height: "20px", padding: "8px", border: '1px solid grey', borderRadius: "4px" }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
            style={{ height: "20px", padding: "8px", border: `1px solid ${isUserExists ? 'red' : 'grey'}`, borderRadius: "4px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isUserExists && <span style={{color: 'red', fontSize: '12px', fontWeight: 'bold'}}>User Already Exists</span>}
        </div>
        <div style={{ display: "flex", flexFlow: "column", gap: "4px" }}>
          <label htmlFor="password" style={{ fontWeight: "bold" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            style={{ height: "20px", padding: "8px", border: '1px solid grey', borderRadius: "4px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          <input type="checkbox" id="receiveoutbid" name="receiveoutbid" />
          <label htmlFor="receiveoutbid">Receive outbid emails</label>
        </div>
        <div style={{ display: "flex", flexFlow: "column", gap: "4px" }}>
          {/*<Link to="/signupsuccess">*/}
            <Button type={Type.primary} width="100%" onClick={handleSubmit}>
              Submit
            </Button>
          {/*</Link>*/}
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
          <span>Want to know more?</span>{" "}
          <Link
            to="/signup"
            style={{ color: "dodgerblue", fontWeight: "bold" }}
          >
            Auction rules
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
        <img src={SignUpImage} alt="signinimage" height={480} />
      </div>
    </div>
  );
};

export default Signup;
