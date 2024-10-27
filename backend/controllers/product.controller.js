import mongoose from "mongoose";

import Product from "../models/product.model.js";

export const getProduct = async (req, res, t) => {
  try {
    console.log("get method----- success");
    const products = await Product.find({});

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", error.message);

    res.status(500).json({ success: false, message: "server error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; //user will send this data
  console.log("------------createProduct---------------", product);
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
    console.log("post is working", newProduct);
  } catch (err) {
    console.err("Error in Create product:", err.message);
    res.status(500).json({ success: false, message: "server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("id :", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.log("error in deleting products", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
