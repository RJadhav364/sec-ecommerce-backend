import "../config/dotenv.js";
import verifyJWTToken from "../middlewar/verifyToken.js";
import productModel from "../models/ProductModel.js";
import productReviewModel from "../models/ProductReviewModel.js";
import customerModel from "../models/customerModel.js";
import { getReviewsWithProfilePic } from "../utils/getProductReviewWithCustInfo.js";
import throwError from "../utils/throwError.js";

const createNewProductReview = async (req, res) => {
  try {
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
            userId: req.body.userId,
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
  } catch (error) {
    switch (true) {
      case error.errorResponse && error.errorResponse.keyPattern.productID == 1:
        // res.status(409).send({ message: "Email ID already exist" });
        throwError("You have already reviewed this product", 409);
        break;
      default:
        res.status(400).send({ message: "Something went wrong" });
    }
  }
};

const getProductReview = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = await getReviewsWithProfilePic(productId);
    res
      .status(200)
      .send({ message: "Product reviews fetched successfully", productData });
  } catch (error) {
    console.log(error);
    // switch (true) {
    //   case error.errorResponse && error.errorResponse.keyPattern.productID == 1:
    //     // res.status(409).send({ message: "Email ID already exist" });
    //     throwError("You have already reviewed this product", 409);
    //     break;
    //   default:
    //     res.status(400).send({ message: "Something went wrong" });
    // }
  }
};

export { createNewProductReview, getProductReview };
