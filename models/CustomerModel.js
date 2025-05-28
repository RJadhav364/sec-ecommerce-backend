import jwt from "jsonwebtoken"
import "../config/dotenv.js"
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const customerScheme = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
});


const customerModel = mongoose.model('customer', customerScheme);

export default customerModel;