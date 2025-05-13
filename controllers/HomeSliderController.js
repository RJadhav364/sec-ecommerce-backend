import "../config/dotenv.js";
import homeSliderModel from "../models/HomeSliderModel.js";


const uploadNewSliderImg = async(req,res) => {
    try {
        let finalObj;
        const file = req.files.homeSliderImage;
        const contentType = file.type;
        const imageBuffer = fs.readFileSync(file.path);
        const base64Image = imageBuffer.toString('base64');
        const finalImageUrl = `data:${contentType};base64,${base64Image}`
        finalObj = {homeSliderImage: {data: finalImageUrl, contentType: contentType}}
        const result = await homeSliderModel.create(finalObj);
        res.status(200).send({message: "Home slider image uploaded",result})
        
    } catch (error) {
        
    }
}

export {uploadNewSliderImg}