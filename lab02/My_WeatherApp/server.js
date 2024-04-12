const express = require("express");
const app = express();
const hbs = require("hbs");
const fetch =require("node-fetch");


// Встановлення шляху до компонентів partials
hbs.registerPartials(__dirname + '/views/partials');

// Встановлення двигуна відображення HBS
app.set('view engine', 'hbs');


// Обробник маршруту кореневого шляху
app.get('/', (req, res) => {
    res.render('index'); // Відображення шаблону index.hbs
});

// Маршрут для відображення сторінки з погодою
app.get('/weather', (req, res) => {
    res.render('weather'); // Відображення шаблону weather.hbs без передачі даних
});

// Обробник маршруту '/weather/:city'
app.get('/weather/:city', async (req, res) => {
    try {
        // Отримання назви міста з параметрів URL
        const city = req.params.city;

        if (!city) {
            // Якщо назва міста не вказана, повертається сторінка з помилкою
            return res.render('error', { message: "City not specified" });
        }

        // Ключ API
        const key = 'b5018676b6c9e7d01aa7056fd2b9186d';

        // Запит до API погоди
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
        const weatherData = await response.json();

        // Перевірка, чи отримано дані про погоду
        if (weatherData.cod !== 200) {
            // Якщо отримано помилку від API, повертається сторінка з помилкою
            return res.render('error', { message: weatherData.message });
        }

        // Передача отриманих даних про погоду до шаблону
        res.render('weather', { city, weather: weatherData });
    } catch (error) {
        // Якщо виникає помилка під час виконання запиту, повертається сторінка з помилкою
        res.render('error', { message: "An error occurred while fetching weather data" });
    }
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000");
});
