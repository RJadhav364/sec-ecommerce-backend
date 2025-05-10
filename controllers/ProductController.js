import "../config/dotenv.js"
import productModel from "../models/ProductModel.js"

const createNewProduct = async(req,res) => {
    try {
        // console.log("HI", req.body)
        const newRegistration = await productModel.create(req.body);
        res.status(200).send({message: "HI, THIS API TO TEST GIT FLOW", newRegistration})
    } catch (error) {
        // console.log(error.errorResponse.keyPattern)
        switch(true){
            case error.errorResponse.keyPattern.productName == 1:
                res.status(409).send({message: "Product name already exist" });
                break;
        }
    }
}

const getallProduts = async(req,res) => {
    try {
        // console.log("HI", req.body)
        const newRegistration = await productModel.find({});
        res.status(200).send({message: "HI, THIS API TO TEST GIT FLOW", newRegistration})
    } catch (error) {
        console.log(error)
    }
}


export {createNewProduct, getallProduts}