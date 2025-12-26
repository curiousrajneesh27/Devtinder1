import multer from "multer";
import path from "path";
import { ErrorHandler } from "./handlers.js";

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    // Allowed file types
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf",
        "text/plain",
        "application/json",
        "text/javascript",
        "application/javascript",
        "text/x-python",
        "text/x-java-source",
        "text/x-c",
        "text/x-c++",
        "text/html",
        "text/css"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ErrorHandler("Invalid file type. Only images, PDFs, and code files are allowed", 400), false);
    }
};

// Configure multer
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: fileFilter
});
