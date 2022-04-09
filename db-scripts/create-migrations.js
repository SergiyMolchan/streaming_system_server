const { query } = require('./database');
const migrations = require('./migrations');

const processingMigraions = migrations.map(query);
Promise.all(processingMigraions).then(result => {
    console.log('Migrations created.');
}).catch(error => {
    console.log(error);
    console.log('Migrations not created.');
})