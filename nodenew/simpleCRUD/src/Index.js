const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes);


app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
