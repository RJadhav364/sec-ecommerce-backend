import "../config/dotenv.js";
import categoryModel from "../models/CategoryModel.js"
import subCategoryModel from "../models/SubCategoryModel.js";


const createNewCategory = async(req,res) => {
    try {
        const newCategory = await categoryModel.create(req.body);
        res.status(200).send({message: "new category created", newCategory});
    } catch (error) {
        console.log(error);
    }
}

const getallCategories = async(req,res) => {
    try {
        // console.log("HI", req.body)
        const allCategoriesList = await categoryModel.find({});
        const allSubCategories = await subCategoryModel.find({parentCategory: allCategoriesList._id})
        res.status(200).send({message: "Get all categories", allCategoriesList, allSubCategories})
    } catch (error) {
        console.log(error)
    }
}


export {createNewCategory, getallCategories}