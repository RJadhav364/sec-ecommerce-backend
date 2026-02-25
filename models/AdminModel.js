import jwt from "jsonwebtoken"
import "../config/dotenv.js"
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminScheme = new Schema({
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
    role: {
        type: String,
        required: true,
        default: "subadmin"  
    },

});


adminScheme.methods.generateToken = async function (payload){
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
const adminModel = mongoose.model('ecom-admin', adminScheme);


export default adminModel;