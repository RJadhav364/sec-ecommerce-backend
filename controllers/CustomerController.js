import "../config/dotenv.js"
import customerModel from "../models/customerModel.js"

const createNewCustomer = async(req,res) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.log(error)
    }
}

export {createNewCustomer}