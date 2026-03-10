import "../config/dotenv.js";
import verifyJWTToken from "../middlewar/verifyToken.js";
import wishListModel from "../models/CustomerWishListModel.js";


const addinWishList = async(req,res) => {
    const headersToken = req.headers['authorization'];
    let productInList;
    // console.log("req.body",req.body)
    if(headersToken){
        const token  = headersToken.split(" ")[1];
        const tokenResult = await verifyJWTToken(token);
        // console.log(tokenResult)
        switch(true){
            case tokenResult.result == "true":
                productInList = await wishListModel.find({productId: req.body.id , userId: req.body.userId})
                // console.log("productInList",productInList)
                if(productInList.length > 0){
                    res.status(409).send({message: "Product exist in Cart"});
                } else{
                    const wishListResult = await wishListModel.create({wishList: req.body , productId: req.body.id, userId: req.body.userId});
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

const getAllFavouriteProducts = async(req,res) => {
    let productInList;
    try {
        const headersToken = req.headers['authorization'];
        if(headersToken){
        const token  = headersToken.split(" ")[1];
        const tokenResult = await verifyJWTToken(token);
            // switch(true){
            //     case tokenResult.result == "true":
                    productInList = await wishListModel.find({userId: req.params.id})
                    // console.log("productInList",productInList.length)
                    res.status(200).send({message: "Products In Cart" , data: productInList});
            //         break;
            //     default:
            //         res.status(403).send({message: "Token has expired"});
            // }
        } else{
        res.status(498).send({message: "Token not found"})
        }
    } catch (error) {
        console.log(error)
    }
}

const removeProductFromWishList = async(req,res) => {
    let productInList;
    try {
        const headersToken = req.headers['authorization'];
        if(headersToken){
        const token  = headersToken.split(" ")[1];
        const tokenResult = await verifyJWTToken(token);
            switch(true){
                case tokenResult.result == "true":
                    productInList = await wishListModel.findOneAndDelete({productId: req.body.productId , userId: req.body.userId})
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

export {addinWishList , getAllFavouriteProducts, removeProductFromWishList}