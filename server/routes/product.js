import express from "express";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { BiddingItem } from "../models/BiddingItem.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object 
 *       properties:
 *         id:
 *           type: number
 *           description: product id
 *           example: 1
 *         name:
 *           type: string
 *           description: product name
 *           example: Apple ear buds
 *         minBid:
 *           type: number
 *           description: minimum bid amout
 *           example: 100
 *         currentBid:
 *           type: number
 *           description: current bidded amout
 *           example: 150
 *         bidEndsBy:
 *           type: date
 *           description: time at bidding ends
 *           example: June 24, 12:45 AM
 *         description:
 *           type: string
 *           description: product description
 *           example: Comes with wireless charging
 *         imageId:
 *           type: number
 *           description: product image reference id
 *           example: Comes with wireless charging
 *         reviews:
 *           type: array
 *           description: user reviews for a product
 *           items:
 *             $ref: "#/components/schemas/Reviews"
 *         createdAt:
 *           type: date
 *           description: product created date time
 *           example: 15 March, 2021
 *         updatedAt:
 *           type: date
 *           description: product updated date time
 *           example: 12 June, 2021
 *     Reviews:
 *       type: object
 *       properties:
 *         reviewerId:
 *           type: number
 *           description: reviewed user id
 *           example: 1
 *         reviewerName:
 *           type: string
 *           description: reviewer user name
 *           example: John Wick
 *         reviewercomments:
 *           type: string
 *           description: comments provided by reviewer
 *           example: Good product with decent quality
 *         reviewerRating:
 *           type: number
 *           description: number of starts given by reviewer
 *           example: 3
 *         reviewedDate:
 *           type: date
 *           description: date at wich reviewer rated product
 *           example: 12 July, 2023
 * /api/product/getItems:
 *   get:
 *     description: Get all the products available for auction bidding
 *     responses:
 *       200:
 *         description: Fetched products successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: list of products
 *                   items: 
 *                     $ref: "#/components/schemas/Product"
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
 *                   example: Successfully fetched products
*/
router.get("/getItems", async (req, res) => {
  const items = await Product.find({});
    return res.json({
      status: 200,
      success: true,
      message: "Products fetched successfully",
      data: items,
    });
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object 
 *       properties:
 *         id:
 *           type: number
 *           description: product id
 *           example: 1
 *         name:
 *           type: string
 *           description: product name
 *           example: Apple ear buds
 *         minBid:
 *           type: number
 *           description: minimum bid amout
 *           example: 100
 *         currentBid:
 *           type: number
 *           description: current bidded amout
 *           example: 150
 *         bidEndsBy:
 *           type: date
 *           description: time at bidding ends
 *           example: June 24, 12:45 AM
 *         description:
 *           type: string
 *           description: product description
 *           example: Comes with wireless charging
 *         imageId:
 *           type: number
 *           description: product image reference id
 *           example: Comes with wireless charging
 *         reviews:
 *           type: array
 *           description: user reviews for a product
 *           items:
 *             $ref: "#/components/schemas/Reviews"
 *         createdAt:
 *           type: date
 *           description: product created date time
 *           example: 15 March, 2021
 *         updatedAt:
 *           type: date
 *           description: product updated date time
 *           example: 12 June, 2021
 *     Reviews:
 *       type: object
 *       properties:
 *         reviewerId:
 *           type: number
 *           description: reviewed user id
 *           example: 1
 *         reviewerName:
 *           type: string
 *           description: reviewer user name
 *           example: John Wick
 *         reviewercomments:
 *           type: string
 *           description: comments provided by reviewer
 *           example: Good product with decent quality
 *         reviewerRating:
 *           type: number
 *           description: number of starts given by reviewer
 *           example: 3
 *         reviewedDate:
 *           type: date
 *           description: date at wich reviewer rated product
 *           example: 12 July, 2023
 * /api/product/getItemById/{id}:
 *   get:
 *     description: Get all the products available for auction bidding
 *     parameters:
 *       - in: params
 *         name: id
 *         required: true
 *         description: Numeric ID of the Product to retrieve product
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fetched products successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: list of products
 *                   $ref: "#/components/schemas/Product"
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
 *                   example: Successfully fetched products
*/
router.get("/getItemById/:id", async (req, res) => {
    const {id} = req.params;
    const item = await Product.findOne({id});
      return res.json({
        status: 200,
        success: true,
        message: "Products fetched successfully",
        data: item,
      });
});

/**
 * @swagger
 * /api/product/placeBid:
 *   post:
 *     description: Place a bid for a product
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
 *               productId:
 *                 type: number
 *                 description: Id of product to place bid
 *                 example: 1
 *               bidPrice:
 *                 type: number
 *                 description: bid amount placed by user
 *                 example: 150
 *     responses:
 *       200:
 *         description: Placed bid succeess for product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: user information
 *                   properties:
 *                     user:
 *                       type: string
 *                       description: User's first name
 *                       example: Alex
 *                     product:
 *                       type: string
 *                       description: product id
 *                       example: 1
 *                     bidPrice:
 *                       type: number
 *                       description: Placed bid price
 *                       example: 150
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
 *                   example: User placed bid successfully
*/
router.post('/placeBid', async (req, res) => {
    const {bidPrice, productId, email} = req.body;
    const user = await User.findOne({email});
    const product = await Product.findOne({id: productId});
    const newBid = new BiddingItem({
        user,
        product,
        bidPrice,
    });
    await newBid.save();
    await Product.updateOne({_id: product._id}, {currentBid: bidPrice});
    return res.json({status: 200, success: true, message: "Bid Placed Successfully", data: {user: user.firstName, product: product._id, bidPrice}});
});

/**
 * @swagger
 * components:
 *   schemas:
 *     BiddingItem:
 *       type: object 
 *       properties:
 *         user:
 *           type: string
 *           description: User's first name
 *           example: Alex
 *         product:
 *           type: string
 *           description: product id
 *           example: 1
 *         bidPrice:
 *           type: number
 *           description: Placed bid price
 *           example: 150
 *         createdAt:
 *           type: date
 *           description: product created date time
 *           example: 15 March, 2021
 *         updatedAt:
 *           type: date
 *           description: product updated date time
 *           example: 12 June, 2021
 * /api/product/getBids:
 *   get:
 *     description: Get all the products available for auction bidding
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         description: Numeric ID of the Product to retrieve bids for product
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fetched bids successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: bids placed for product
 *                   items:
 *                     $ref: "#/components/schemas/BiddingItem"
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
 *                   example: Successfully fetched products
*/
router.get('/getBids', async (req, res) => {
    const {productId} = req.query;
    const product = await Product.findOne({id: parseInt(productId)});
    const bids = await BiddingItem.find({product});
    const newBids = await Promise.all(bids.map( async bid => {
        const newUser = await User.findOne(bid.user);
        return {user: newUser.firstName, product: bid.product, bidPrice: bid.bidPrice, createdAt: bid.createdAt, updatedAt: bid.updatedAt};
    }));
    newBids.sort((a, b) => (b.createdAt - a.createdAt));
    return res.json({status: 200, success: true, message: "Bids Fetched Successfully", data: newBids});
});

router.post('/addItem', async (req, res) => {
    const item = await Product.create(req.body);
    return res.json({
        status: 200,
        success: true,
        message: "Products fetched successfully",
        data: item,
    })
});

export { router as ProductRouter };
