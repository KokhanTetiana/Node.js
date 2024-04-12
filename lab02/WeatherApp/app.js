const express = require("express");
const app = express();
const hbs = require("hbs");

// Встановлення шляху до компонентів partials
hbs.registerPartials(__dirname + '/views/partials');

// Обробник для маршруту головної сторінки
app.get('/', (req, res) => {
    res.send("Hello, Express");
});

// Обробник для маршруту '/login'
app.get('/login', (req, res) => {
    res.send("This is a Login Page");
});

// Виведення значення параметрів URL при GET-запиту
// Семантичний URL
app.get('/weather/:city', (req, res) => {
    const city = req.params.city;
    res.send(`The weather in ${city}`);
    console.log('City parameter:', city);
});

// Класичний URL
/*app.get('/weather', (req, res) => {
    const city = req.query.city;
    res.send(`The weather in ${city}`);
    console.log('City parameter:', city);
});*/

// Маршрут для '/weather' для відображення сторінки з використанням шаблонів HBS та передачі даних про погоду
app.get('/weather', (req, res) => {
    const weather = {
        description: "Clear sky"
    }
    res.render('weather.hbs', {weather});
});

// Встановлення двигуна відображення HBS
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log("Example app listening on port 3000");
});

