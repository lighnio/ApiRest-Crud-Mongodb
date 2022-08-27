import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname } from "path";


const __dirname = dirname(fileURLToPath(import.meta.url))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const pathStorage =  `${__dirname}/../storage`
        cb(null, pathStorage)
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        const filename = `file-${Date.now()}.${ext}`
        cb(null, filename)
    }
})

export const uploadMiddleware = multer({storage});