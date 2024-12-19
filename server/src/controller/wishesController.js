const model = require("../model/wishesModel");
const multer = require('multer');
const db = require('../services/db'); // Import the MySQL connection pool

// Set up Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Default image data
const defaultImage = './Images/giftbox.png';

module.exports.uploadImage = (req, res, next) => {
    if (req.body.name == undefined) {
        res.status(400).json({
            message: "Information missing"
        })
    }

    let imageBuffer;
    if (req.file) {
        imageBuffer = req.file.buffer;  // If a file is uploaded, use its buffer
    } else {
        imageBuffer = defaultImage;  // Use a default image if no file is uploaded
    }

    const data = {
        name: req.body.name,
        description: req.body.description,
        image: imageBuffer
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createWish:", error);
            res.status(500).json(error)
        }

    }

    model.createWish(data, callback);
}

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
            output.push({
                id: wishes.wish_id,
                name: wishes.name,
                description: wishes.description,
                image: imageBase64
            })
        });

        res.status(200).json(output);
    }

    model.selectAllwishes(callback);
}