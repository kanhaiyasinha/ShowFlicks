const mongoose = require('mongoose');

const mongoURL = process.env.mongo_url;

mongoose.connect(mongoURL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    dbName: 'showFlicks' // Specify the name of your new database here
});

const connection = mongoose.connection;

connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

connection.on('connected', () => {
    console.log('MongoDB connected');
});

