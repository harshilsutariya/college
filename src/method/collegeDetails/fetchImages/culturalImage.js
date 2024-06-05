import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const tempPath = path.join(__dirname, '../../../assets/cultural');
console.log(__dirname);
import { fileURLToPath } from 'url';
import path from 'path';
// console.log(tempPath);

export const culturalImageMethod = async (req, res) => {
    try {
        var imageName = req.params["imageName"];
        res.sendFile(tempPath + '/' + imageName);
    }
    catch (error) {
        res.status(500).json({ message: "error" });
    }
}

export default culturalImageMethod;
