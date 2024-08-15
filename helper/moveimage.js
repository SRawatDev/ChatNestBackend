import path from "path";
import { mkdir } from "fs/promises"; // Use fs/promises for promise-based mkdir
import jetpack from "fs-jetpack";
import { fileURLToPath } from "url";
import fs from "fs";

const Helper = {};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

Helper.moveFileFromFolder = async (filename, targetFolder) => {
    let desPath = '';
    const uploadDirFile = path.join(__dirname, "../public/tempUploads/" + filename);
    const uploadfilePath = path.join(__dirname, "../../public/images/" + targetFolder);
    
    if (fs.existsSync(uploadfilePath)) {
        desPath = uploadfilePath;
    } else {
        desPath = path.join(__dirname, "../../public/images/" + targetFolder);
        await mkdir(desPath, { recursive: true });
    }
    
    if (fs.existsSync(uploadDirFile)) {
        const src = jetpack.cwd("public/tempUploads");
        const dst = jetpack.cwd("public/images/" + targetFolder);
        src.find({ matching: filename }).forEach(desPath => {
            src.move(desPath, dst.path(desPath));
        });
    } else {
        // console.log('not found');
    }
};

export default Helper;
