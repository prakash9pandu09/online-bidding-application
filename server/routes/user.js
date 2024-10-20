import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();


/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     description: adds new user to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *                 example: Alex
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *                 example: Hales
 *               email:
 *                 type: string
 *                 description: Users' email address
 *                 example: alex.hales@dummymail.com
 *               password:
 *                 type: string
 *                 description: Users' login password
 *                 example: abc#abc1
 *     responses:
 *       200:
 *         description: Successful user creation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: any
 *                   description: requested data
 *                   example: ''
 *                 status:
 *                   type: number
 *                   description: success response
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   description: is request successfull or not
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: successful response message
 *                   example: User created successfully
*/
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

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     description: login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Users' email address
 *                 example: alex.hales@dummymail.com
 *               password:
 *                 type: string
 *                 description: Users' login password
 *                 example: abc#abc1
 *     responses:
 *       200:
 *         description: Successful user signin.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: user information
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       description: User's first name
 *                       example: Alex
 *                     lastName:
 *                       type: string
 *                       description: User's last name
 *                       example: Hales
 *                     email:
 *                       type: string
 *                       description: Users' email address
 *                       example: alex.hales@dummymail.com
 *                 status:
 *                   type: number
 *                   description: success response
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   description: is request successfull or not
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: successful response message
 *                   example: User loggedin successfully
*/
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

/**
 * @swagger
 * /api/auth/signout:
 *   get:
 *     description: signout user
 *     responses:
 *       200:
 *         description: Successful user signout and clear cookies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: any
 *                   description: requested data
 *                   example: ''
 *                 status:
 *                   type: number
 *                   description: success response
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   description: is request successfull or not
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: successful response message
 *                   example: User created successfully
*/
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

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     description: verify if user is loggedin or not
 *     parameters:
 *       - in: cookie
 *         name: jwt_token
 *         required: true
 *         description: jwt token.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Verified user login activity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: user information
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       description: User's first name
 *                       example: Alex
 *                     lastName:
 *                       type: string
 *                       description: User's last name
 *                       example: Hales
 *                     email:
 *                       type: string
 *                       description: Users' email address
 *                       example: alex.hales@dummymail.com
 *                 status:
 *                   type: number
 *                   description: success response
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   description: is request successfull or not
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: successful response message
 *                   example: Authorized user
*/
router.get("/verify", verifyUser, async (req, res) => {
  const token = req.cookies.jwt_token;
  const decoded = jwt.decode(token, process.env.TOKEN_KEY);
  const {firstName, lastName, email} = decoded;
  return res.json({ status: 200, success: true, message: "Authorized", data: {firstName, lastName, email} });
});

/**
 * @swagger
 * /api/auth/getuser?userId=id:
 *   get:
 *     description: login user
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fetched user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: user information
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       description: User's first name
 *                       example: Alex
 *                     lastName:
 *                       type: string
 *                       description: User's last name
 *                       example: Hales
 *                     email:
 *                       type: string
 *                       description: Users' email address
 *                       example: alex.hales@dummymail.com
 *                 status:
 *                   type: number
 *                   description: success response
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   description: is request successfull or not
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: successful response message
 *                   example: User information fetched successfully
*/
router.get('/getUser', async (req, res) => {
    const {userId} = req.query;
    const user = await User.findOne({_id: userId});
    const {firstName, lastName, email} = user;
    return res.json({ status: 200, success: true, message: "User Fetched Successfully", data: {firstName, lastName, email} })
});

export { router as UserRouter };
