// passing product id in reviewer model and in object we get customr id so in customer model getting profile pic to passed in review

import productReviewModel from "../models/ProductReviewModel.js";
import customerModel from "../models/customerModel.js";

export const getReviewsWithProfilePic = async (productId) => {
  const reviews = await productReviewModel.find({ productID: productId });

  const productData = await Promise.all(
    reviews.map(async (review) => {
      const customer = await customerModel.findById(
        review.userId,
        "customeProfilePic",
      );
      return {
        ...review.toObject(),
        profilePic: customer?.customeProfilePic || null,
      };
    }),
  );
  return productData;
};
