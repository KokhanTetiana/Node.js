const fs = require("fs");
fs.appendFile("task02.txt", "Hello, World!\n", function(error) {
    if (error) {
        throw error;
    }
    console.log("Результат:");

    fs.readFile("task02.txt", "utf8", function(error, data) {
        if (error) {
            throw error;
        }
        console.log(data);
    });
});