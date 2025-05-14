import "../config/dotenv.js";
import homeSliderModel from "../models/HomeSliderModel.js";
import fs from "fs"


const uploadNewSliderImg = async(req,res) => {
    try {
         let finalObj;
        const file = req.files.homeSliderImage;
        const contentType = file.type;
        const imageBuffer = fs.readFileSync(file.path);
        const base64Image = imageBuffer.toString('base64');
        const finalImageUrl = `data:${contentType};base64,${base64Image}`
        console.log(finalImageUrl)
        finalObj = {homeSliderImage: finalImageUrl, contentType: contentType}
        const result = await homeSliderModel.create(finalObj);
        res.status(200).send({message: "Home slider image uploaded"})
    } catch (error) {
        console.log(error)
        ressend({message: "error occured", error})
    }
}

const getAllImageSlider = async(req,res) => {
    
   // to get image of product
   try {
    const allImages = await homeSliderModel.find({});
    res.status(200).send({message: "Gett all Images", allImages})
    } catch (error) {
        console.log(error)
        ressend({message: "error occured", error})
    }
}

export {uploadNewSliderImg, getAllImageSlider}