const pool = require('../services/db');

module.exports.createWish = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO Wishes (name, description, image) 
        VALUES (?, ?, ?)
       `;
    const VALUES = [data.name, data.description, data.image];

    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.selectAllChallenge = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Wishes;
        `;

    pool.query(SQLSTATEMENT, callback);
}