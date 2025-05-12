import "../config/dotenv.js";
import subCategoryModel from "../models/SubCategoryModel.js";


const createNewSubCategory = async(req,res) => {
    try {
        // console.log(req.body)
        const newSubCategory = await subCategoryModel.create(req.body);
        res.status(200).send({message: "new category created", newSubCategory});
    } catch (error) {
        switch(true){
            case error.errorResponse.keyPattern.subCategoryName == 1:
                res.status(409).send({message: "Sub Category name already exist" });
                break;
        }
    }
}

const getallSubCategories = async(req,res) => {
    try {
        const subcategories = await subCategoryModel.find({});
        res.status(200).send({message: "HI, THIS API TO TEST GIT FLOW", subcategories})
    } catch (error) {
        console.log(error);
    }
}


export {createNewSubCategory,getallSubCategories}