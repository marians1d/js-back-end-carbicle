const mongoose = require('mongoose');

require('./Car');

const connectionString = 'mongodb://127.0.0.1:27017/carbicle';

async function init() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database Error');
            console.error(err);
        });
    } catch (err) {
        console.error('Error connecting to database');
        process.exit(1);
    }
}

module.exports = init;