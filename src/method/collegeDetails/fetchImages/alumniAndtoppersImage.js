import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const tempPath = path.join(__dirname, '../../../assets/alumniAndToppers');
console.log(tempPath);
import { fileURLToPath } from 'url';
import path from 'path';

export const academicsImageMethod = async (req, res) => {
    try {
        var imageName = req.params["imageName"];
        res.sendFile(tempPath + '/' + imageName);
    }
    catch (error) {
        res.status(500).json({ message: "error" });
    }
}

export default academicsImageMethod;
