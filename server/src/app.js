const express = require('express');
const cors = require('cors')

const app = express();
// Enable CORS before setting up routes
app.use(cors({
    origin: 'http://127.0.0.1:5500',
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const mainRoutes = require('./route/mainRoutes');
app.use("/", mainRoutes);

module.exports = app;