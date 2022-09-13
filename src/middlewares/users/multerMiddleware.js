const path = require('path');
const multer = require('multer');

// Config's Multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/users");
    },
    filename: function (req, file, cb) {
        const newAvatar = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        cb(null, newAvatar);
    }
});
const uploadFile = multer({ storage });

module.exports = uploadFile;