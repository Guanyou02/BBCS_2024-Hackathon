const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS Wishes;

CREATE TABLE Wishes (
    wish_id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    description TEXT,
    price FLOAT,
    image LONGBLOB
);
`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
      console.error("Error creating tables:", error);
    } else {
      console.log("Tables created successfully");
    }
    process.exit();
  });