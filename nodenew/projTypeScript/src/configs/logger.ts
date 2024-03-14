
import winston from "winston";
import path from "path";

const { combine, timestamp, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}]  ${level}: ${message}`;
  });


  export const infoLogger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), myFormat),
    defaultMeta: { service: "index" },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: path.join(__dirname, '../logs/info.log'), level: 'info' }),
    ],
  });
  
  export const errorLogger = winston.createLogger({
    level: "error",
    format: combine(timestamp(), myFormat),
    defaultMeta: { service: "index" },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'info' }),
    ],
  });



