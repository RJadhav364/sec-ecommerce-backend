import "../config/dotenv.js"
import productModel from "../models/ProductModel.js"

const createNewProduct = async(req,res) => {
    try {
        console.log("HI")
        res.status(200).send("HI, THIS API TO TEST GIT FLOW")
    } catch (error) {
        console.log(error)
    }
}


export {createNewProduct}