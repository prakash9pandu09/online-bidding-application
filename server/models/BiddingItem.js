import mongoose from "mongoose";

const BiddingItemSchema = new mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "Product"},
    user: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "User"},
    bidPrice: {type: Number, require: true},
}, {timestamps: true});

const BiddingItemModel = mongoose.model("BiddingItem", BiddingItemSchema);

export {BiddingItemModel as BiddingItem};