import "../config/dotenv.js";
import verifyJWTToken from "../middlewar/verifyToken.js";
import cartProductModel from "../models/CustomerCartProduct.js";
import cartListModel from "../models/CustomerCartProduct.js";
import productModel from "../models/ProductModel.js";


const addProductInCart = async(req,res) => {
    const headersToken = req.headers['authorization'];
    let productInList;
    // console.log("req.body",req.body)
    if(headersToken){
        const token  = headersToken.split(" ")[1];
        const tokenResult = await verifyJWTToken(token);
        // console.log(tokenResult)
        switch(true){
            case tokenResult.result == "true":
                productInList = await cartProductModel.find({productId: req.body.productId , userId: req.body.userId})
                if(productInList.length > 0){
                    // console.log(productInList)
                    const productData = await cartProductModel.findOneAndUpdate({productId:req.body.productId},{productQuantity: productInList[0].productQuantity + 1 });
                    res.status(200).send({message: `Product quantity increased for ${productInList[0].cartProducts.productName}`});
                } else{
                    const productDetails = await productModel.findById(req.body.productId);
                    const wishListResult = await cartProductModel.create({cartProducts: productDetails , productId: req.body.productId, userId: req.body.userId});
                    // console.log("wishListResult",wishListResult)
                    res.status(200).send({message: "Product added in wish list"});
                }
                break;
            default:
                res.status(403).send({message: "Token has expired"});
        }
    } else{
        res.status(498).send({message: "Token not found"})
    }
}

const getAllCartProducts = async(req,res) => {
    let productInList;
    try {
        const headersToken = req.headers['authorization'];
        if(headersToken){
        const token  = headersToken.split(" ")[1];
        const tokenResult = await verifyJWTToken(token);
            switch(true){
                case tokenResult.result == "true":
                    productInList = await cartProductModel.find({userId: req.params.id})
                    res.status(200).send({message: "Products In Cart" , data: productInList});
                    break;
                default:
                    res.status(403).send({message: "Token has expired"});
            }
        } else{
        res.status(498).send({message: "Token not found"})
        }
    } catch (error) {
        console.log(error)
    }
}

const removeProductFromCart = async(req,res) => {
    let productInList;
    try {
        const headersToken = req.headers['authorization'];
        if(headersToken){
        const token  = headersToken.split(" ")[1];
        const tokenResult = await verifyJWTToken(token);
            switch(true){
                case tokenResult.result == "true":
                    productInList = await cartListModel.findOneAndDelete({productId: req.body.productId , userId: req.body.userId})
                    // console.log("productInList",productInList.length)
                    res.status(200).send({message: "Product remove from list"});
                    break;
                default:
                    res.status(403).send({message: "Token has expired"});
            }
        } else{
        res.status(498).send({message: "Token not found"})
        }
    } catch (error) {
        console.log(error)
    }
}

export {addProductInCart , getAllCartProducts, removeProductFromCart}