const yargs = require('yargs');
const user = require('./user');

user.loadUserData();

yargs.command({
    command: 'add',
    describe: 'Додати мову користувача',
    builder: {
        title: {
            describe: 'Назва мови',
            demandOption: true,
            type: 'string',
        },
        level: {
            describe: 'Рівень мови',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) => {
        try {
            user.addLanguage(argv.title, argv.level);
            console.log('Мову додано успішно.');
        } catch (error) {
            console.error(error.message);
        }
    },
})
yargs.command({
    command: 'remove',
    describe: 'Видалити мову користувача',
    builder: {
        title: {
            describe: 'Назва мови',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) => {
        try {
            user.removeLanguage(argv.title);
            console.log('Мову видалено успішно.');
        } catch (error) {
            console.error(error.message);
        }
    },
})
yargs.command({
    command: 'list',
    describe: 'Переглянути список мов користувача',
    handler: () => {
        const languages = user.listLanguages();
        console.log('Список мов користувача:');
        languages.forEach(lang => console.log(`${lang.title} - ${lang.level}`));
    },
})
yargs.command({
    command: 'read',
    describe: 'Переглянути інформацію про мову користувача',
    builder: {
        title: {
            describe: 'Назва мови',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) => {
        try {
            const language = user.readLanguage(argv.title);
            console.log(`Мова: ${language.title}`);
            console.log(`Рівень: ${language.level}`);
        } catch (error) {
            console.error(error.message);
        }
    },
})

yargs.parse()

console.log("Програма готова до виконання команд. Введіть одну з доступних команд: add, remove, list або read.");