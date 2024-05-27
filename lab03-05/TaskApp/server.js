// index.js
const express = require('express');
const connectDB = require('./db');
const user_listRouter = require('./routers/user_listRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const taskRouter = require('./routers/taskRouter');






const app = express();


app.set('view engine', 'hbs'); // Встановлюємо двіжок для відображення шаблонів
app.use(express.urlencoded({ extended: true }));
app.use(user_listRouter); // Підключаємо роутер списку користувачів
app.use(userRouter); // Підключаємо роутер користувачів
app.use(authRouter); // Підключаємо роутер входу користувачів
app.use(taskRouter); // Підключаємо роутер входу користувачів


connectDB();

app.listen(3000, () => {
    console.log("Example app listening on port 3000");
});
