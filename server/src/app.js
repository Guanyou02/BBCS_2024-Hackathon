const express = require('express');
const cors = require('cors')

const app = express();
// Enable CORS before setting up routes
app.use(cors({
    origin: 'https://bbcs-2024-hackathon.vercel.app',
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const mainRoutes = require('./routes/mainRoutes');
app.use("/", mainRoutes);

module.exports = app;