import "../config/dotenv.js";
import categoryModel from "../models/CategoryModel.js"
import subCategoryModel from "../models/SubCategoryModel.js";
import fs from "fs"
import thirdLevelCategoryModel from "../models/ThirdLevelCategoryModel.js";

const createNewCategory = async(req,res) => {
    try {
        let finalObj;
        const contentType = req.files.categoryImage.type;
        const imageBuffer = fs.readFileSync(req.files.categoryImage.path);
        finalObj = {categoryImage: {data: imageBuffer, contentType: contentType}, ...req.fields}
        const newCategory = await categoryModel.create(finalObj);
        res.status(200).send({message: "new category created"});
    } catch (error) {
        console.log(error);
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
    let assignedThirdLevelData;
    try {
        // console.log("HI", req.body)
        const allCategoriesList = await categoryModel.find({}).select("-categoryImage");
        assignedCategory = await subCategoryModel.find({});
        const allhirdLevelList = await thirdLevelCategoryModel.find({});
        // console.log(allhirdLevelList)
        passedData = allCategoriesList.map(({_id,categoryName,categoryImage,createdAt,updatedAt}) => {
           assignedCategoryData = assignedCategory.filter((value) =>  value.parentCategory.equals(_id));
            //   console.log("assignedThirdLevelData",assignedCategoryData._id)
           assignedThirdLevelData = allhirdLevelList.filter((result) => result.subCategory.equals(assignedCategoryData._id));
           return {
            id: _id,
            categoryName,
            categoryImage,
            createdAt,
            updatedAt,
            subNavbar: assignedCategoryData.length > 0 ? true : false,
            children: assignedCategoryData.map(({_id,subCategoryName,parentCategory,createdAt,updatedAt}) => {
                return {
                    id: _id,
                    subCategoryName,
                    parentCategory,
                    createdAt,
                    updatedAt,
                    children: allhirdLevelList.filter((result) => result.subCategory.equals(_id))
                }
            })
           }
        })
        res.status(200).send({message: "Get all categories", passedData})
    } catch (error) {
        console.log(error)
    }
}

// get category image
const getCategoryImage = async(req,res) => {
    // console.log(req.params)
    try {
        const product = await categoryModel.findById(req.params.id).select('categoryImage');
        // console.log(product);

        if(product.categoryImage.data){
            res.set('Content-Type',product.categoryImage.contentType)
            return res.status(200).send(product.categoryImage.data)
        } else{
            res.status(404).send('Image not found');
        }
    } catch (error) {
        console.log(error)
        res.send({message: "error occured", error})
    }
}


export {createNewCategory, getallCategories, getCategoryImage}