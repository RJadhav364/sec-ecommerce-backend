import "../config/dotenv.js"
import categoryModel from "../models/CategoryModel.js";
import productModel from "../models/ProductModel.js"
import fs from "fs"
const createNewProduct = async(req,res) => {
    try {
        let newProductObj = req.fields;
        let finalObj;
        let productImagesArray = [];
        const files = req.files.productImages;
        // const contentType = file.type;
        // const imageBuffer = fs.readFileSync(file.path);
        const imagesArray = Array.isArray(files) ? files : [files];
        imagesArray.forEach(file => {
            const contentType = file.type; // depending on your Formidable version
            const imageBuffer = fs.readFileSync(file.path); // filepath in latest Formidable

            productImagesArray.push({
                data: imageBuffer,
                contentType: contentType,
            });
        });
        // finalObj = {productImages: {data: imageBuffer, contentType: contentType}, ...newProductObj}
        finalObj = {
            productImages: productImagesArray,
            ...newProductObj,
        };
        const result = await productModel.create(finalObj);
        res.status(200).send({message: "HI, THIS API TO TEST GIT FLOW"})
    } catch (error) {
        console.log(error)
        switch(true){
            case error.errorResponse.keyPattern.productName == 1:
                res.status(409).send({message: "Product name already exist" });
                break;
        }
    }
}

const getallProduts = async(req,res) => {
    let categoryList;
    let assignedCategoryData;
    let params;
    let filterKey;
    let filterId;
    let thirdLevelCategory;
    try {
        // console.log("HI", req.params.id);
        params = req.params.id;
        params = params.split("=");
        // console.log(params)
        filterKey = params[0];
        filterId = params[1]
        // console.log(filterId)
        const newRegistration = await productModel.find({[filterKey]:filterId}).select('-productImages');
        // console.log(newRegistration)
        categoryList = await categoryModel.find({}).select('-categoryImage');
        let passedData = newRegistration.map(({_id,productName,productOldPrice,productCurrentPrice,productRating,productInStock,productBrand,productImages,categoryId,productDiscount}) => {
            assignedCategoryData = categoryList.find(value =>  value._id.equals(categoryId));
            return {
                id: _id,
                productName,
                productOldPrice,
                productCurrentPrice,
                productRating,
                productDiscount,
                productInStock,
                productBrand,
                productImages,
                categoryName: assignedCategoryData.categoryName,
                categoryId: assignedCategoryData._id,
                assignedCategoryData
            }
        })
        res.status(200).send({message: "HI, THIS API TO TEST GIT FLOW", passedData})
    } catch (error) {
        console.log(error)
        res.send({message: "error occured", error})
    }
}

// to get image of product
const getProductImage = async (req, res) => {
  const { id, index } = req.params;

  try {
    const product = await productModel.findById(id).select('productImages');

    if (product && product.productImages.length > index) {
      const image = product.productImages[index];
      res.set('Content-Type', image.contentType);
      return res.status(200).send(image.data);
    } else {
      return res.status(404).send('Image not found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error occurred', error });
  }
};

const getParticularProduct = async(req,res) => {
    try {
        let productImagesArray = [];
        let contentType;
        let base64Image;
        const productId = req.params.id;
        const productData = await productModel.findById({_id: productId }).lean();
        // const data = await productModel.findById({_id: productId }).select("-productImages");
        // console.log(data.productImages)
        const images = productData.productImages.map(({data,contentType},index) => {
            // contentType = imageObj.contentType;
            base64Image = data.toString('base64');
            return `data:${contentType};base64,${base64Image}`;
        })
        const {productImages, ...restValues} = productData;
        // console.log("restValues",restValues);
        const data = {images, ...restValues}
        // console.log(abc.length)
        res.status(200).send({message: "Product fetch successfullu", data})
    } catch (error) {
        console.log(error);
    }
}


export {createNewProduct, getallProduts,getProductImage,getParticularProduct}