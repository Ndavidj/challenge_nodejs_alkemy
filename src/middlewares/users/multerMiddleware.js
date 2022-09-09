const path = require('path');
const multer = require('multer');

// Config's Multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        const newImage = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        cb(null, newImage);
    }
});
const uploadFile = multer({ storage });

module.exports = uploadFile;