import "../config/dotenv.js";
import thirdLevelCategoryModel from "../models/ThirdLevelCategoryModel.js";


const createNewThirdLevelCategory = async(req,res) => {
    try {
        // console.log(req.body)
        const newSubApartCategory = await thirdLevelCategoryModel.create(req.fields);
        res.status(200).send({message: "new third level category created", newSubApartCategory});
    } catch (error) {
        console.log(error)
        switch(true){
            case error.errorResponse.keyPattern.subCategoryName == 1:
                res.status(409).send({message: "Sub Category name already exist" });
                break;
        }
    }
}

export {createNewThirdLevelCategory}