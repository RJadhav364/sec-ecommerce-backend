import "../config/dotenv.js";
import verifyJWTToken from "../middlewar/verifyToken.js";
import wishListModel from "../models/CustomerWishListModel.js";


const addinWishList = async(req,res) => {
    const headersToken = req.headers['authorization'];
    // console.log("req.body",req.body)
    if(headersToken){
        const token  = headersToken.split(" ")[1];
        const tokenResult = await verifyJWTToken(token);
        // console.log(tokenResult)
        switch(true){
            case tokenResult.result == "true":
                const wishListResult = await wishListModel.create({wishList: req.body , productId: req.body.id});
                // console.log("wishListResult",wishListResult)
                res.status(200).send({message: "Product added in wish list"});
                break;
            default:
                res.status(403).send({message: "Token has expired"});
        }
    } else{
        res.status(498).send({message: "Token not found"})
    }
}

export {addinWishList}