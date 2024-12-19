const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS Wishes;

CREATE TABLE Wishes (
    wish_id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    description TEXT,
    image LONGBLOB
);

INSERT INTO Stories (user_id, name, moment) VALUES
(1, 'Timothy', 'When she yells at you for forgetting what she told you earlier today, but you are just a chill guy enjoying your day'),
(2, 'Bob', 'When my life is in shambles but then I remember Im just a chill guy who understands that sometimes shit just happens'),
(3, 'James', 'When I send bro a video late night about the "Chill Guy" so he responds cuz we both are chill guys'),
(4, 'Alex', 'When your boss is mad at you for coming in late all the time but you're just a chill guy that oversleeps sometimes'),
(5, 'Daniel', 'When you parents ask "Why do you shower for so long?" but you are just a chill guy who enjoys the warm water');
`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
      console.error("Error creating tables:", error);
    } else {
      console.log("Tables created successfully");
    }
    process.exit();
  });