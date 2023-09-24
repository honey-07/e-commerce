const mongoose = require('mongoose');
require('dotenv').config();
const connectMongoose = () => {
    console.log(process.env.MONGODB_URI);
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('Connected to MongoDB 🔥 🔥 🔥 ');
        })
        .catch((error) => {
            console.log('Error connecting to MongoDB 🔥 🔥 🔥 ', error);
        })
}
module.exports = connectMongoose;