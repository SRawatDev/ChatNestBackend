import path from "path";
import { mkdir } from "fs/promises";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadImageArr = async (req, res) => {
    try {
        const fileNames = [];
        const files = req.files.tempImage;
        const processFile = async (file) => {
            const uploadDir = path.join(__dirname, "../public/tempUploads");
            await mkdir(uploadDir, { recursive: true });
            const now_time = Date.now();
            const tempImageName = `${now_time}___${file.name}`;
            const imagePath = path.join(uploadDir, tempImageName);
            await file.mv(imagePath);
            const imgInfo = fs.statSync(imagePath);
            const fileSizeMB = imgInfo.size / (1024 * 1024);
            if (fileSizeMB > 5) {
                return { status: false, message: { file: file.name, error: 'file size is greater than 5 MB' } };
            } else {
                fileNames.push(tempImageName);
                return { status: true };
            }
        };
        if (Array.isArray(files)) {
            for (const file of files) {
                const result = await processFile(file);
                if (!result.status) {
                    return res.send(result);
                }
            }
        } else {
            const result = await processFile(files);
            if (!result.status) {
                return res.send(result);
            }
        }

        return res.send({ status: true, path: fileNames });
    } catch (error) {
        console.error('error', error);
        return res.send({ status: false, message: error.message });
    }
};

export default uploadImageArr;
