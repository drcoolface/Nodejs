import express, { Express , ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import AppDataSource from "./configs/ormconfig";
import cron from "node-cron"
import userRouter from './routes/userRouter';
import eventRouter from './routes/eventRouter'

import { EmailService } from "./services/EmailService";


dotenv.config();

cron.schedule('* 1 * * *', async () => {
  console.log('Running task to send today\'s events digest to admin...');
  await EmailService.sendTodaysEvents();
}, {
  scheduled: true,
  timezone: "Asia/Kathmandu" 
});


const errorHandler: ErrorRequestHandler = (err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  };

  
AppDataSource.initialize().then(() => {
    const app:Express = express();
    
    app.use(express.json());

  
    // Routes
    app.use('/users', userRouter);
    app.use('/events', eventRouter);

  
app.use(errorHandler); 


    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


  }).catch(error => console.log('Error during Data Source initialization', error));