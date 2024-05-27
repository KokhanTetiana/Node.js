const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Обробка GET-запиту на головну сторінку
router.get('/', (req, res) => {
    res.render('authorization'); // Рендеримо сторінку авторизації
});

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Перевіряємо, чи введено електронну пошту та пароль адміна
        if (email === 'admin@example.com' && password === 'adminpassword') {
            // Якщо електронна пошта та пароль адміна введено правильно, перенаправляємо на сторінку зі списком користувачів
            return res.redirect('/users');
        }

        // В іншому випадку, виконуємо стандартну аутентифікацію
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'Користувача з таким email не знайдено' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send({ error: 'Невірний пароль' });
        }

        // Генеруємо JWT токен
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

        // Додаємо токен до масиву токенів користувача
        user.tokens = user.tokens.concat({ token });
        await user.save();

        // Перенаправляємо користувача на сторінку user_tasks, передавая токен як параметр запиту
        res.redirect(`/tasks/${user._id}?token=${token}`);
    } catch (error) {
        res.status(500).send({ error: 'Помилка сервера' });
    }
});



module.exports = router;
