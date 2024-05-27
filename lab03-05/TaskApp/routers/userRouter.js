
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Обробник GET-запиту для відображення сторінки реєстрації
router.get('/register', (req, res) => {
    res.render('registration');
});

// Обробник POST-запиту для реєстрації користувача
router.post('/register', async (req, res) => {
    try {
        const { name, email, age, password } = req.body;

        // Перевірка віку
        if (age < 0) {
            return res.status(400).json({ message: 'Вік повинен бути додатнім числом' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new User({ name, email, age, password: hashedPassword });
        await user.save();
        res.redirect('/'); // Після успішної реєстрації перенаправлення на головну сторінку
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
