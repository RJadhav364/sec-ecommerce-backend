import express from "express"
import connectionMongoDB from "./connection.js";
import productController from "./routes/ProductRoutes.js";
import cors from "cors"

const app = express();
const PORT = 9000;
app.use(cors(corsOptions));
connectionMongoDB();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
var corsOptions = {
    origin: "*",  // Allow any origin for now (you can restrict this to specific origins later)
    methods: "GET,HEAD,POST,PUT,PATCH,DELETE",  // Allowed methods
    allowedHeaders: "Content-Type,Authorization",  // Allowed headers
    optionsSuccessStatus: 200  // Some legacy browsers choke on 204
};
app.use("/product", productController)
app.listen(PORT, () => {
    console.log(`app is running on PORT ${PORT}`);
})