// user_listRouter.js
const express = require('express');
const User = require('../models/User');


const router = express.Router();

// Обробник запиту для отримання всіх користувачів
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.render('users_list', { users });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Обробник POST-запиту для видалення користувача
router.post('/users/:id/delete', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).send();
        }

        // Перенаправлення на сторінку списку користувачів з повідомленням про успішне видалення
        res.redirect('/users?deleted=true');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
