const pool = require('../services/db');

module.exports.createWish = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO Wishes (name, description, price, image) 
        VALUES (?, ?, ?, ?)
       `;
    const VALUES = [data.name, data.description, data.price, data.image];

    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.selectAllwishes = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Wishes;
        `;

    pool.query(SQLSTATEMENT, callback);
}