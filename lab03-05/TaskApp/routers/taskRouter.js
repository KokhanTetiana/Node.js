const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const router = express.Router();

// Обробка GET-запиту для виведення завдань користувача
router.get('/tasks/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const token = req.query.token;

        // Перевіряємо, чи передано обидва параметри: userId і token
        if (!userId || !token) {
            return res.status(401).send({ error: 'Необхідно ввійти для доступу до цієї сторінки' });
        }

        // Знаходимо користувача за userId
        const user = await User.findById(userId);

        // Перевіряємо, чи знайдено користувача і чи є у нього переданий токен
        if (!user || !user.tokens.find(tok => tok.token === token)) {
            return res.status(401).send({ error: 'Необхідно ввійти для доступу до цієї сторінки' });
        }

        // Знаходимо завдання, створені користувачем з вказаним userId
        const tasks = await Task.find({ createdBy: userId });

        // Рендеримо шаблон сторінки користувача зі списком завдань
        res.render('user_tasks', { tasks, userId });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Помилка сервера' });
    }
});




// Обробка POST-запиту для створення новой задачі
router.post('/tasks/:userId', async (req, res) => {
    try {
        const { title, description, userId } = req.body; // Отримаємо дані
        const newTask = new Task({ title, description, createdBy: userId }); // Створено новий об'єкт
        await newTask.save();
        // Після збереження оновлюємо сторінку
        const tasks = await Task.find({ createdBy: userId });
        res.render('user_tasks', { tasks, userId });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Помилка сервера' });
    }
});

// Обработка POST-запит для видалення задачі
router.post('/tasks/:taskId/delete', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        await Task.findByIdAndDelete(taskId); // Видаляємо її за ідентифікатором з бази даних
        const userId = req.body.userId; // Отримуємо ідентифікатор користувача
        // Після видалення ми оновлюємо сторінку і відображаємо без видалених
        const tasks = await Task.find({ createdBy: userId });
        res.render('user_tasks', { tasks, userId });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Помилка сервера' });
    }
});

module.exports = router;
