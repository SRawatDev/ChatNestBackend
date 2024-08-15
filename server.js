import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { fileURLToPath } from 'url';
import path from 'path';
import connection from "./db/connection.js";
import Router from "./routes/api.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;
const app = express();
dotenv.config()
app.use(cors({
    origin: "*"
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public', 'images')));
app.use(express.json());
app.use(cookieParser())
app.use(fileUpload())
app.use("/v1/api/", Router);
await connection();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
