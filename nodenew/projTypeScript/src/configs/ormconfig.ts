import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entity/User";
import { Event } from "../entity/Event";
import { Registration } from "../entity/Registration";
import path = require("path");

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"), // Convert string to number
  username: process.env.DB_USERNAME ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_DATABASE ,
  synchronize: true, // Ensure boolean true/false
  logging: true, // Ensure boolean true/false
  entities: [
   User,
   Event,
   Registration
  ],
  migrations: 
  [  
    path.join(__dirname, "migrations/**/*.ts")],
    

  subscribers: [
  ],

  
});

export default AppDataSource;
