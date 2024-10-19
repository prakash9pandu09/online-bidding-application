import express from "express";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { BiddingItem } from "../models/BiddingItem.js";

const router = express.Router();

router.get("/getItems", async (req, res) => {
  const items = await Product.find({});
    return res.json({
      status: 200,
      success: true,
      message: "Products fetched successfully",
      data: items,
    });
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

export { router as ProductRouter };
