const Product = require("../model/Admin.Product.model");
const multer = require("multer");
const maxSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../public/uploads/images");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .jpg, .jpeg and .png format allowed!"));
        }
    }
}).single("image");



module.exports = {
    addProduct: async (req, res) => {
        const {
            name,
            price,
            description,

        } = req.body;

        try {
            let product = await Product.findOne({
                name
            });
            if (product) {
                return res.status(400).json({
                    msg: "Product Already Exists"
                });
            }

            product = new Product({
                name,
                price,
                description,
                image
            });

            await upload(req, res, async (err) => {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json(err);
                } else if (err) {
                    return res.status(500).json(err);
                }

                console.log(req.file);
            });

            await product.save();

            res.status(200).json({
                product
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    },
};