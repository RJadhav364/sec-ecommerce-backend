import "../config/dotenv.js";
import verifyJWTToken from "../middlewar/verifyToken.js";
import productModel from "../models/ProductModel.js";
import productReviewModel from "../models/ProductReviewModel.js";
import customerModel from "../models/customerModel.js";

const createNewProductReview = async (req, res) => {
  const headersToken = req.headers["authorization"];
  let productInList;
  if (headersToken) {
    const token = headersToken.split(" ")[1];
    const tokenResult = await verifyJWTToken(token);
    switch (true) {
      case tokenResult.result == "true":
        const userDetails = await customerModel
          .findOne({ _id: req.body.userId })
          .select("username");
        const productDetails = await productModel
          .findOne({ _id: req.body.productId })
          .select("productName");
        productInList = await productReviewModel.create({
          productName: productDetails.productName,
          productID: req.body.productId,
          reviewerName: userDetails.username,
          description: req.body.description,
          productRating: String(req.body.stars),
        });
        // console.log("wishListResult",wishListResult)
        res.status(200).send({ message: "Review submitted successfully" });
        break;
      default:
        res.status(403).send({ message: "Token has expired" });
    }
  } else {
    res.status(498).send({ message: "Token not found" });
  }
};

const getProductReview = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log("productId", productId);
        const productData = await productReviewModel.find({productID: productId });
        res.status(200).send({message: "Product reviews fetched successfully", productData})
    } catch (error) {
        console.error("Error fetching product reviews:", error);
    }
}

export { createNewProductReview , getProductReview };
