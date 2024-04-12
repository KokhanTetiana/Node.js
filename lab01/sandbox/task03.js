const fs = require('fs');
const os = require('os');

const userName = os.userInfo().username;
const congratulations = `Hello, ${userName}!`;
console.log(congratulations);

fs.writeFile('task03.txt', congratulations, (error) => {
    if (error) {
        console.error('Помилка при записі у файл:', error);
        return;
    }
    console.log('Привітання успішно записано у файл "task03.txt".');
});