import "../config/dotenv.js";
import categoryModel from "../models/CategoryModel.js"
import subCategoryModel from "../models/SubCategoryModel.js";


const createNewCategory = async(req,res) => {
    try {
        const newCategory = await categoryModel.create(req.body);
        res.status(200).send({message: "new category created", newCategory});
    } catch (error) {
        // console.log(error);
        switch(true){
            case error.errorResponse.keyPattern.categoryName == 1:
                res.status(409).send({message: "Category name already exist" });
                break;
        }
    }
}

const getallCategories = async(req,res) => {
    let passedData;
    let assignedCategory;
    let assignedCategoryData;
    try {
        // console.log("HI", req.body)
        const allCategoriesList = await categoryModel.find({});
        assignedCategory = await subCategoryModel.find({});
        passedData = allCategoriesList.map(({_id,categoryName,categoryImage,createdAt,updatedAt}) => {
           assignedCategoryData = assignedCategory.filter((value) =>  value.parentCategory.equals(_id));
        //    console.log("assignedCategory",assignedCategoryData ,value.parentCategory == _id)
           return {
            id: _id,
            categoryName,
            categoryImage,
            createdAt,
            updatedAt,
            subNavbar: assignedCategoryData.length > 0 ? true : false,
            children: assignedCategoryData
           }
        })
        res.status(200).send({message: "Get all categories", passedData})
    } catch (error) {
        console.log(error)
    }
}


export {createNewCategory, getallCategories}