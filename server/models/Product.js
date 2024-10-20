import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id: {type: Number},
    name: {type: String, required: true},
    minBid: {type: Number, required: true},
    currentBid: {type: Number, required: true},
    bidEndsBy: {type: Date, required: true},
    description: {type: String, required: true},
    imageId: {type: Number},
    reviews: {type: Object},
}, {timestamps: true});

const ProductModel = mongoose.model("Product", ProductSchema);

export {ProductModel as Product};