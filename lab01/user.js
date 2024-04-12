const fs = require('fs');

let user = {
    firstName: '',
    lastName: '',
    languages: [],
};

function loadUserData() {
    try {
        const data = fs.readFileSync('user.json', 'utf8');
        user = JSON.parse(data);
    } catch (error) {
        console.error('Помилка при завантаженні даних з файлу:', error.message);
    }
}

function saveUserData() {
    try {
        const data = JSON.stringify(user, null, 2);
        fs.writeFileSync('user.json', data);
    } catch (error) {
        console.error('Помилка при збереженні даних у файл:', error.message);
    }
}

function addLanguage(title, level) {
    loadUserData();
    validateString(title, 'Назва мови');
    validateString(level, 'Рівень мови');

    const existingLanguage = user.languages.find(lang => lang.title === title);
    if (existingLanguage) {
        throw new Error("Мова з такою назвою вже існує.");
    }

    user.languages.push({ title, level });
    saveUserData();
}

function removeLanguage(title) {
    loadUserData();
    validateString(title, 'Назва мови');

    const index = user.languages.findIndex(lang => lang.title === title);
    if (index !== -1) {
        user.languages.splice(index, 1);
        saveUserData();
    } else {
        throw new Error("Мову з такою назвою не знайдено.");
    }
}

function listLanguages() {
    loadUserData();
    if (!user.languages || user.languages.length === 0) {
        throw new Error("Список мов порожній.");
    }

    return user.languages;
}

function readLanguage(title) {
    loadUserData();
    validateString(title, 'Назва мови');

    const language = user.languages.find(lang => lang.title === title);
    if (language) {
        return language;
    } else {
        throw new Error("Мову з такою назвою не знайдено.");
    }
}

// Валідація для рядків (не null та не порожній рядок)
function validateString(value, fieldName) {
    if (!value || typeof value !== 'string' || value.trim() === '') {
        throw new Error(`Невірне значення для ${fieldName}.`);
    }
}

module.exports = {
    loadUserData,
    addLanguage,
    removeLanguage,
    listLanguages,
    readLanguage,
};
