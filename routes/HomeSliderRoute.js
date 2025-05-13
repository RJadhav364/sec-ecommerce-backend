import express from "express"
import formidable from 'express-formidable';

const homeSliderController = express.Router();

homeSliderController.post("/new-slider-image", formidable(), uploadNewSliderImg);
export default homeSliderController;
