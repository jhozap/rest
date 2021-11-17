const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://Prueba:yWQx7KGHM6YsSGmy@ventas-c3.s2ski.mongodb.net/rest');
        console.log('DB online');
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    dbConnection
}