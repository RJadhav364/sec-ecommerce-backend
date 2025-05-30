import "../config/dotenv.js";
import verifyJWTToken from "../middlewar/verifyToken.js";
import wishListModel from "../models/CustomerWishListModel.js";


const addinWishList = async(req,res) => {
    const headersToken = req.headers['authorization']
    if(headersToken){
        const token  = headersToken.split(" ")[1];
        const tokenResult = await verifyJWTToken(token);
        // console.log(tokenResult)
        switch(true){
            case tokenResult:
                res.status(200).send("hi");
                break;
            default:
                res.status(403).send("Unauthorized");
        }
        // console.log("tokenResult",tokenResult);
    } else{
        res.status(498).send({message: "Token not found"})
    }
}

export {addinWishList}