

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
},{
    timestamps:true //createAt, updateAt
});

const Product = mongoose.model('Product',productSchema);

//here the collection name is Product but mongoose will take it as products

export default Product;