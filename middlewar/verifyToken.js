// import { jwtKey } from "../config/common.js";
import "../config/dotenv.js"
import jwt from "jsonwebtoken"
const verifyJWTToken = async(token) => {
    let response;
    try {
        const result = jwt.verify(token, process.env.JWTKEY);
        response = {result: "true", decode: result}
        return response;
    } catch (error) {
        response = {result: "false"}
        return response;
    }
    
}

export default verifyJWTToken;