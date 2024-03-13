const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const bodyParser = require('body-parser');
const pool = require('./config/db'); 
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes');
const {infoLogger, errorLogger} = require('./config/logger')
require('dotenv').config();

const app = express();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


const port = process.env.PORT || 3000; 
app.use(bodyParser.json());



app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes)


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
  logger.error("Internal Server Error");
});

async function initializeDatabase() {
  const createTablesQueries = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      stock_quantity INTEGER NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS stores (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS cart (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      product_id INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL,
      UNIQUE(user_id, product_id),
      added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS stores (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      type VARCHAR(50) CHECK (type IN ('Electronics', 'Grocery', 'Clothing', 'Stationery')),
      location VARCHAR(200) 

    )
  `;

  try {
    await pool.query(createTablesQueries);

    infoLogger.info(`All tables created or already exist.`);
  } catch (err) {
    errorLogger.error(`Error creating tables:dwddd`, err);


    process.exit(1); 
  }
}

initializeDatabase().then(() => {
  app.listen(port, () => {
    infoLogger.info(`Server is running on port ${port}`);

  });
});
