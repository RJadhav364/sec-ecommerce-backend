import express from "express"
import bodyParser from "body-parser";
import connectionMongoDB from "./connection.js";
import productController from "./routes/ProductRoutes.js";
import cors from "cors"
import categoryController from "./routes/CategoryRoutes.js";
import subCategoryController from "./routes/SubCategoryRoutes.js";
import homeSliderController from "./routes/HomeSliderRoute.js";
import thirdLevelCategoryController from "./routes/ThirdLevelCategoryRoutes.js";

const app = express();
const PORT = 9000;
var corsOptions = {
    origin: "*",  // Allow any origin for now (you can restrict this to specific origins later)
    methods: "GET,HEAD,POST,PUT,PATCH,DELETE",  // Allowed methods
    allowedHeaders: "Content-Type,Authorization",  // Allowed headers
    optionsSuccessStatus: 200  // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));
connectionMongoDB();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/product", productController)
app.use("/category", categoryController)
app.use("/sub-category", subCategoryController)
app.use("/thirdlevel-category", thirdLevelCategoryController)
app.use("/slider", homeSliderController)
app.listen(PORT, () => {
    console.log(`app is running on PORT ${PORT}`);
})