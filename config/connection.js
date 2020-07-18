const mongoose = require('mongoose');
const URI = "mongodb+srv://admin:admin@cluster0.mey34.mongodb.net/db?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`Database is connected!`)
}

module.exports = connectDB;