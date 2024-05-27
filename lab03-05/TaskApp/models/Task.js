const mongoose = require('mongoose');

// Описуємо схему для моделі Task
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true // Обрізка крайніх пробілів
    },
    description: {
        type: String,
        required: true,
        trim: true // Обрізка крайніх пробілів
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Посилання на модель користувача
    }
});

// Створюємо модель Task на основі схеми
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
