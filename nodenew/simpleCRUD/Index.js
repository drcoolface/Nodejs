const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes')
const userRoutes = require('./src/routes/userRoutes');
const connectDB  = require('./src/utils/MongoConnection');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; 
app.use(bodyParser.json());


app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

async function startServerWithDatabase() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
}
if (process.env.NODE_ENV='production'){
  startServerWithDatabase();
}
else{
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
}