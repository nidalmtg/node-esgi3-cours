const mongoose = require('mongoose');

// const mongoDB = new mongoose.Mongoose();

exports.connect = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
}