import express from "express";
import {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/",getAllProduct);
productRouter.post("/add",createProduct);
productRouter.delete("/delete/:id",deleteProduct);
productRouter.put("/update/:id",updateProduct);

export default productRouter;
