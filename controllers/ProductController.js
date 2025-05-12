import "../config/dotenv.js"
import categoryModel from "../models/CategoryModel.js";
import productModel from "../models/ProductModel.js"

const createNewProduct = async(req,res) => {
    try {
        // console.log("HI", req.body)
        const newRegistration = await productModel.create(req.body);
        res.status(200).send({message: "HI, THIS API TO TEST GIT FLOW"})
    } catch (error) {
        console.log(error)
        switch(true){
            case error.errorResponse.keyPattern.productName == 1:
                res.status(409).send({message: "Product name already exist" });
                break;
        }
    }
}

const getallProduts = async(req,res) => {
    let categoryList;
    let assignedCategoryData;
    try {
        // console.log("HI", req.body)
        const newRegistration = await productModel.find({});
        categoryList = await categoryModel.find({});
        // console.log(categoryList)
        let passedData = newRegistration.map(({_id,productName,productOldPrice,productCurrentPrice,productRating,productInStock,productBrand,productImages,categoryId}) => {
            assignedCategoryData = categoryList.find(value =>  value._id.equals(categoryId));
            return {
                id: _id,
                productName,
                productOldPrice,
                productCurrentPrice,
                productRating,
                productInStock,
                productBrand,
                productImages,
                categoryName: assignedCategoryData.categoryName,
                assignedCategoryData
            }
        })
        res.status(200).send({message: "HI, THIS API TO TEST GIT FLOW", passedData})
    } catch (error) {
        console.log(error)
    }
}


export {createNewProduct, getallProduts}