import express from  "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/auth.js"
import { register } from "./controllers/auth.js";

import { fileURLToPath } from "url";


//CONFIGURATIONS

const __filname = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filname);
dotenv.config();
const app = express();
 app.use(express.json());
 app.use(helmet());
 app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
 app.use(morgan("common"));
 app.use(cors());
 app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
 app.use(express.urlencoded({extended: true}));


 //FILE STORAGE

 const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },

    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
 })
const upload = multer({storage});

//ROUTES WITH FILE
app.post("/auth/register", upload.single("picture"), register);

/* ROUTES */

app.use("/auth", authRoutes);

//MONGOOSE SETUP

mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT,  () => console.log(`Amandla, Awethu... Listen on PORT ${PORT}`))
}).catch((error) => console.log(` ERROR on ${error} : Check It `))
