const model = require("../model/wishesModel");
const multer = require('multer');
const fs = require('fs');
const db = require('../services/db'); // Import the MySQL connection pool

// Set up Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Default image data
const defaultImage = fs.readFileSync('./src/Images/giftbox.png');

// Export the upload middleware
module.exports.upload = upload;  // This makes it available in your routes

module.exports.uploadImage = (req, res, next) => {
    let imageBuffer;
    if (req.file) {
        imageBuffer = req.file.buffer;  // If a file is uploaded, use its buffer
    } else {
        imageBuffer = defaultImage;  // Use a default image if no file is uploaded
    }

    const data = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: imageBuffer
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createWish:", error);
            return res.status(500).json(error);
        }

        // Send success response
        res.status(200).json({
            message: "Wish created successfully",
            data: results
        });
    };

    model.createWish(data, callback);
};

module.exports.readAllwishes = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectAllwishes:", error);
            res.status(500).json(error);
        }

        if (results.length == 0) {
            res.status(403).json({
                message: "No wish found"
            })
        }

        let output = []
        results.forEach(wishes => {
            // Convert Buffer data to Base64 string
            let imageBase64 = '';
            if (wishes.image && Buffer.isBuffer(wishes.image)) {
                // Convert the Buffer to a Base64 string
                imageBase64 = wishes.image.toString('base64');
            }

            output.push({
                id: wishes.wish_id,
                name: wishes.name,
                description: wishes.description,
                price: wishes.price,
                image: imageBase64 // Base64-encoded image data
            });
        });

        res.status(200).json(output);
    }

    model.selectAllwishes(callback);
}