import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewears.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";

// formidable bizga malumotlardagi rasm yuklashni server va fronend bilash ishlashda yordam beradi
import formidable from "express-formidable";

const router = express.Router();

// routes =========================================
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update products =========================================
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get products ===================================================
router.get("/get-product", getProductController);

// single product =====================================================================
router.get("/get-product/:slug", getSingleProductController);

//get photo (pid=product id) ==================================================================
router.get("/product-photo/:pid", productPhotoController);

// delete product ===========================================================================
router.delete("/delete-product/:pid", deleteProductController);

// filter product ===========================================================================
router.post("/product-filters", productFilterController);

// product count ===========================================================================
router.get("/product-count", productCountController);

// product per page ===========================================================================
router.get("/product-list/:page", productListController);

// search product ===========================================================================
router.get("/search/:keyword", searchProductController);

// similiar product ===========================================================================
router.get("/related-product/:pid/:cid", relatedProductController);

// scategory wise product  ===========================================================================
router.get("/product-category/:slug", productCategoryController);

// payments route
// token
router.get("/braintree/token", braintreeTokenController);

// payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
