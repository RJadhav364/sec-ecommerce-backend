import "../config/dotenv.js"
import categoryModel from "../models/CategoryModel.js";
import productModel from "../models/ProductModel.js"
import fs from "fs"
const createNewProduct = async(req,res) => {
    try {
        let newProductObj = req.fields;
        let finalObj;
        // console.log(newProductObj)
        const file = req.files.productImages;
        const contentType = file.type;
        const imageBuffer = fs.readFileSync(file.path);
        const base64Image = imageBuffer.toString('base64');
        const finalImageUrl = `data:${contentType};base64,${base64Image}`
        finalObj = {productImages: {data: finalImageUrl, contentType: contentType}, ...newProductObj}
        console.log(finalObj);
        const result = await productModel.create(finalObj);
        // const newRegistration = new productModel(finalObj);
        // await newRegistration.save();
        res.status(200).send({message: "HI, THIS API TO TEST GIT FLOW",result})
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
        const newRegistration = await productModel.find({}).select('-productImages');
        // console.log(newRegistration)
        categoryList = await categoryModel.find({});
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
                categoryId: assignedCategoryData._id,
                assignedCategoryData
            }
        })
        res.status(200).send({message: "HI, THIS API TO TEST GIT FLOW", passedData})
    } catch (error) {
        console.log(error)
        ressend({message: "error occured", error})
    }
}

// to get image of product
const getProductImage = async(req,res) => {
    console.log(req.params)
    try {
        const product = await productModel.findById(req.params.id).select('productImages');
        // console.log(product.productImages.data);

        if(product.productImages.data){
            // res.set('Content-Type',product.productImages.contentType)
            return res.status(200).send(product.productImages.data)
        } else{
            res.status(404).send('Image not found');
        }
    } catch (error) {
        console.log(error)
        ressend({message: "error occured", error})
    }
}


export {createNewProduct, getallProduts,getProductImage}