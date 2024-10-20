import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({
      status: 409,
      success: false,
      message: "User already existed",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });

  await newUser.save();
  return res.json({
    status: 200,
    success: true,
    message: "User registered successfully",
    data: ''
  });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      status: 404,
      success: false,
      message: "User not registered",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({
      status: 401,
      success: false,
      message: "Password is incorrect",
    });
  }

  const token = jwt.sign(
    { firstName: user.firstName, lastName: user.lastName, email: user.email },
    process.env.TOKEN_KEY,
    { expiresIn: "30m" }
  );
  res.cookie("jwt_token", token, { httpOnly: true, maxAge: 1000*60*60 });

  return res.json({
    status: 200,
    success: true,
    message: "User loggedin successfully",
    data: { firstName: user.firstName, lastName: user.lastName, email: user.email },
  });
});

router.get('/signout', async (req, res) => {
    res.clearCookie("jwt_token");
    return res.json({status: 200, success: true, message: 'User loggedout successfully', data: ''})
});

const verifyUser = (req, res, next) => {
    try {
      const token = req.cookies.jwt_token;
      if (!token) {
        return res.json({
          status: 404,
          success: false,
          message: "Token not found",
        });
      }
      jwt.verify(token, process.env.TOKEN_KEY);
      next();
    } catch (err) {
      return res.json({ status: 400, success: false, message: err });
    }
  };

router.get("/verify", verifyUser, async (req, res) => {
  const token = req.cookies.jwt_token;
  const decoded = jwt.decode(token, process.env.TOKEN_KEY);
  const {firstName, lastName, email} = decoded;
  return res.json({ status: 200, success: true, message: "Authorized", data: {firstName, lastName, email} });
});

router.get('/getUser', async (req, res) => {
    const {userId} = req.query;
    const user = await User.findOne({_id: userId});
    const {firstName, lastName, email} = user;
    return res.json({ status: 200, success: true, message: "User Fetched Successfully", data: {firstName, lastName, email} })
});

export { router as UserRouter };
