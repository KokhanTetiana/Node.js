// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Підключаємо пакет dotenv для зчитування змінних оточення з файлу .env

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;
