import jwt from "jsonwebtoken"
import "../config/dotenv.js"
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const customerScheme = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true, 
    },
    address: {
        type: Object,
    },
    customeProfilePic: {
        data: Buffer,
        contentType:String,
    }

});


customerScheme.methods.generateToken = async function (payload){
        try{
            // console.log(process.env.JWTKEY)
            return jwt.sign(payload,
                process.env.JWTKEY,{
                    expiresIn: "1d",
                }
            )
        } catch(err){
            console.log(err)
        }
}
const customerModel = mongoose.model('customer', customerScheme);


export default customerModel;