const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

function checkFileType(file, cb) {
    // Allowed extensions
    const fileTypes = /jpeg|jpg|png/;
    // Check extention
    const extentionName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    // Check mime
    const mimeName = fileTypes.test(file.mimetype)

    if (extentionName && mimeName) {
        return cb(null, true)
    } else {
        cb('Error: Images Only!')
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
}).single('image')

const uploadProfilePic = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
}).single('profilePicture')

const uploadProfilePicture = (req, res, next) => {
    uploadProfilePic(req, res, (err) => {
        if (err) {
            console.log(err);
            req.flash('error_msg', 'An error occurred while uploading the image.');
            res.redirect('/users/profile');
        } else {
            return next()
        }
    })
}

const uploadImage = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            req.flash('error_msg', 'An error occurred while uploading the image.');
            res.redirect('/users/sell');
        } else {
            if (req.file == undefined) {
                req.flash('error_msg', 'You have to upload an image.');
                res.redirect('/users/sell');
            } else {
                return next()
            }
        }
    })
}

module.exports = {
    uploadImage: uploadImage,
    uploadProfilePicture: uploadProfilePicture
};