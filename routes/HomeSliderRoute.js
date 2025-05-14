import express from "express"
import formidable from 'express-formidable';
import { getAllImageSlider, uploadNewSliderImg } from "../controllers/HomeSliderController.js";

const homeSliderController = express.Router();

homeSliderController.post("/new-slider-image", formidable(), uploadNewSliderImg);
homeSliderController.get("/get-slider-image", getAllImageSlider);
export default homeSliderController;
