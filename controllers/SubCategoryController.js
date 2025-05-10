import "../config/dotenv.js";
import subCategoryModel from "../models/SubCategoryModel.js";


const createNewSubCategory = async(req,res) => {
    try {
        const newSubCategory = await subCategoryModel.create(req.body);
        res.status(200).send({message: "new category created", newSubCategory});
    } catch (error) {
        console.log(error);
    }
}


export {createNewSubCategory}