import mongoose from "mongoose";
import "./config/dotenv.js"
const connectionMongoDB = async() => {
    // console.log(process.env.MongoDB_path);
    // const dbUrl = "mongodb://127.0.0.1:27017/mytesting"
    // const dbUrl = "mongodb+srv://new_user_rohan:rohanJadhav@cluster0.no1et41.mongodb.net/mytesting"
    const dbUrl = `mongodb+srv://${process.env.MONGODB_COMPASS}:${process.env.MONGODB_PASSWORD}@cluster0.iziyiap.mongodb.net/ecommerce`
    
    return mongoose.connect(`${dbUrl}`)
    .then(() => console.log("database connected"))
    .catch((err) => {
        console.log("error while connecting database", err);
    })
}


export default connectionMongoDB