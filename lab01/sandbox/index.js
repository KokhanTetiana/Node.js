const fs = require('fs');
const readline = require('readline');
const lodash = require('lodash');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Змінна, в яку будуть зберігатися введені дані
let inputData = '';

rl.question('Введіть дані: ', (input) => {
    // Зберігаємо введені дані
    inputData = input;

    // Парсимо введені дані як JSON
    const parsedData = JSON.parse(inputData);

    // Обробляємо дані за допомогою методів lodash
    const methodsResults = {
        method1Result: lodash.chunk(parsedData, 2),// 1. Метод _.chunk() Створює масив елементів, розбитий на групи по довжині size
        method2Result: lodash.difference(parsedData, [2], [4]),// 2. Метод _.difference() Створює масив значень крім заданого значення.
        method3Result: lodash.drop(parsedData, 3),// 3. Метод  _.drop() Створює фрагмент масиву, який починається з певного n елемента.
        method4Result: lodash.join(parsedData, '+'),// 4. Метод _.join() Перетворює всі елементи масиву в рядок, розділений роздільником
        method5Result: lodash.reverse(parsedData) // 5. Метод _.reverse() Розташовує елементи масиву у зворотньому порядку.
    };

    // Виводимо результати в консоль
    console.log("Результати обробки даних:");

    console.log("Метод 1. _.chunk()")
    console.log(methodsResults.method1Result);

    console.log("Метод 2. _.difference()")
    console.log(methodsResults.method2Result);

    console.log("Метод 3. _.drop()")
    console.log(methodsResults.method3Result);

    console.log("Метод 4. _.join()")
    console.log(methodsResults.method4Result);

    console.log("Метод 5. _.reverse()")
    console.log(methodsResults.method5Result);

    // Записуємо введені дані та результати обробки у файл process.argv
    fs.writeFile('process.argv', JSON.stringify({ inputData, methodsResults }), (err) => {
        if (err) throw err;
        console.log('Дані записані у файл process.argv');
    });

    rl.close();
});
