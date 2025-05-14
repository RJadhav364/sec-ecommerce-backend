import "../config/dotenv.js"
import mongoose from "mongoose";

const Schema =  mongoose.Schema;

const homeSliderSchema = new Schema({
    homeSliderImage: {
        type: String,
        contentType:String,
    },
},
{ timestamps: true }
);

const homeSliderModel = mongoose.model('homeSlider', homeSliderSchema);

export default homeSliderModel;