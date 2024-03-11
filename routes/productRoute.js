import express from "express";
import {
  addProduct,
  deleteProduct,
  fetchAll,
  fetchOne,
  updateProduct,
} from "../controllers/productController.js";
import multer from "multer";
import path from "path";

const route = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

route.post("/cree", upload.single("image"), addProduct);
route.put("/:id", upload.single("image"), updateProduct);
route.delete("/:id", deleteProduct);
route.get("/", fetchAll);
route.get("/:id", fetchOne);

export default route;
