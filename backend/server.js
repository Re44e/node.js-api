// Configuration for requests.
const express = require('express');
const bodyparser = require('body-parser');

const app = express();

// To parser requests for content 'x-www-form-urlencoded'.
app.use(bodyparser.urlencoded({ extended: true }));

// To parser requests for content 'json'.
app.use(bodyparser.json());

require('./app/routes/note.routes.js')(app);
app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});

// Configuration for the database.
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
mongoose.Promise = global.Promise;

// Database connection.
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to the database...');
}).catch((err) => {
    console.log('Database connection failure...')
    process.exit();
}
);
