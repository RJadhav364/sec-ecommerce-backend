import "../config/dotenv.js"
import { compareHashPassword, convertPasswordToHash } from "../middlewar/passwordHashing.js";
import verifyJWTToken from "../middlewar/verifyToken.js";
import customerModel from "../models/customerModel.js"
import fs from "fs"
import wishListModel from "../models/CustomerWishListModel.js";

const createNewCustomer = async(req,res) => {
    try {
        // console.log(req.body)
        const {password, ...values} = req.body;
        const passwordConversion = await convertPasswordToHash(password);
        const mergeObject = {password: passwordConversion, ...values};
        const newRegistration = await customerModel.create(mergeObject);
        res.status(200).send({message: "New customer created"})
    } catch (error) {
        // console.log(error.errorResponse.keyPattern.email)
        switch(true){
            case error.errorResponse && error.errorResponse.keyPattern.email == 1:
                res.status(409).send({message: "Email ID already exist"});
                break;
            default:
                res.status(400).send({message: "Something went wrong"})
        }
    }
}

const customerLogin = async(req,res) => {
    try {
        const findCredentialsDB = await customerModel.findOne({email: req.body.email});
        // console.log(findCredentialsDB)
        // let wishListcount;
        switch(true){
            case findCredentialsDB == null:
                res.status(404).send({message: "Customer not found"});
                break;
            default:
                const passwordResult = await compareHashPassword(req.body.password , findCredentialsDB.password)
                switch(true){
                    case passwordResult == true:
                        // wishListcount = await wishListModel.countDocuments({userId: findCredentialsDB._id});
                        const payload = {
                            id: findCredentialsDB._id,
                            email: findCredentialsDB.email,
                            username: findCredentialsDB.username,
                        };
                        res.status(200).send({message: "Customer Logged In", data: {
                            token: await findCredentialsDB.generateToken(payload),
                            id: findCredentialsDB._id,
                            email: findCredentialsDB.email,
                            username: findCredentialsDB.username,
                            customeProfilePic: findCredentialsDB?.customeProfilePic,
                        }})
                        break;
                    default:
                        res.status(401).send({message: "Password not match"});
                }
        }
    } catch (error) {
        console.log(error)
    }
}

// api which will update customer data
const updateCustomerDetails = async(req,res) => {
    const headersToken = req.headers['authorization'];
    try {
        if(headersToken){
            const token  = headersToken.split(" ")[1];
            const tokenResult = await verifyJWTToken(token);
            switch(true){
                case tokenResult.result == "true":
                    const contentType = req.files.customeProfilePic.type;
                    const imageBuffer = fs.readFileSync(req.files.customeProfilePic.path);
                    const base64Image = imageBuffer.toString('base64');
                    const finalImageUrl = `data:${contentType};base64,${base64Image}`
                    // console.log(finalImageUrl)
                    const abc = await customerModel.findOneAndUpdate({_id:req.params.id} ,{customeProfilePic: finalImageUrl, contentType: contentType});
                    // console.log(abc)
                    res.status(200).send({message: "Profile image updated" , data: finalImageUrl});
                    break;
                default:
                    res.status(403).send({message: "Token has expired"});
                    break;
            }
        } else{
            res.status(498).send({message: "Token not found"})
        }
        // console.log(req.body);
        // console.log(req.files.customeProfilePic);
    } catch (error) {
        console.log(error)
    }
}

const getAllCustomers = async(req,res) => {
    try {
        console.log()
    } catch (error) {
        
    }
}

export {createNewCustomer,customerLogin, updateCustomerDetails}