import Product from "../models/Product.js";
import fs from "fs/promises";
import path from "path";

/**
 *
 * @param {Request} req
 * @param {Response} res
 */

export const addProduct = async (req, res) => {
  try {
    const { name, categorie, rate, stock, price } = req.body;
    const image = req.file.filename;

    const newProduct = await Product.create({
      name,
      categorie,
      rate,
      stock,
      price,
      image,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, categorie, rate, stock, price } = req.body;
    const image = req.file ? req.file.path : null;

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    let updatedImagePath = product.image;
    if (image) {
      // If a new image is uploaded, delete the previous image file
      if (product.image) {
        const imagePathToDelete = path.join("", product.image);
        await fs.unlink(imagePathToDelete);
      }
      updatedImagePath = image; // Update image path with the new image
    }
    product.name = name;
    product.categorie = categorie;
    product.rate = rate;
    product.stock = stock;
    product.price = price;
    product.image = updatedImagePath;

    await product.save();

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const fetchAll = async (req, res) => {
  try {
    let products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchOne = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
