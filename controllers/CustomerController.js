import "../config/dotenv.js"
import { compareHashPassword, convertPasswordToHash } from "../middlewar/passwordHashing.js";
import customerModel from "../models/customerModel.js"

const createNewCustomer = async(req,res) => {
    try {
        // console.log(req.body)
        const {password, ...values} = req.body;
        const passwordConversion = await convertPasswordToHash(password);
        const mergeObject = {password: passwordConversion, ...values};
        // console.log(mergeObject);
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
        console.log(findCredentialsDB)
        switch(true){
            case findCredentialsDB == null:
                res.status(404).send({message: "Customer not found"});
                break;
            default:
                const passwordResult = await compareHashPassword(req.body.password , findCredentialsDB.password)
                switch(true){
                    case passwordResult == true:
                        const payload = {
                            id: findCredentialsDB._id,
                            email: findCredentialsDB.email,
                            username: findCredentialsDB.username
                        };
                        res.status(200).send({message: "Customer Logged In", data: {
                            token: await findCredentialsDB.generateToken(payload),
                            id: findCredentialsDB._id,
                            email: findCredentialsDB.email,
                            username: findCredentialsDB.username
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

export {createNewCustomer,customerLogin}