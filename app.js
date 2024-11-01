const express = require('express');
const app = express();
require('dotenv').config();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const connectToDatabase = require('./config/database');

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

const postRoutes = require('./routes/postRoutes');
app.use('/api/news', postRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

