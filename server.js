import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { fileURLToPath } from 'url';
import path from 'path';
import { app,server } from "./websocket/index.js";
import connection from "./db/connection.js";
import Router from "./routes/api.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 8000;
// const app = express();
dotenv.config()
app.use(cors({
    origin: "https://chat-nest-zeta.vercel.app",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));
const __filename = fileURLToPath(import.meta.url);
console.log("-->>>",__filename)
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public', 'images')));
app.use(express.static(path.join(__dirname, 'public', 'tempUploads')));
app.use(express.json());
app.use(cookieParser())
app.use(fileUpload())
app.use("/v1/api/", Router);
await connection();
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
