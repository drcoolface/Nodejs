const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI,);
    console.log('Database connected!');
  } catch (error) {
    console.error('Could not connect to db', error);
    process.exit(1);
  }
}


module.exports = connectDB;