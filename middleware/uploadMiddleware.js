const multer = require('multer')
const path = require('path')

// Use memory storage for Vercel serverless (disk storage doesn't work well)
// For production, consider using cloud storage (AWS S3, Cloudinary, etc.)
const storage = process.env.VERCEL === '1' 
    ? multer.memoryStorage() 
    : multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/");
        },
        filename: (req, file, cb) => {
            const uniqueName = Date.now() + path.extname(file.originalname);
            cb(null, uniqueName)
        }
    });

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype.startsWith("image/")) {
    //         cb(null, true);
    //     } else {
    //         cb(new Error("Only image files allowed"));
    //     }
    // }
})

module.exports = upload;