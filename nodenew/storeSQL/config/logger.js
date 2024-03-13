const winston = require('winston');
const { combine, timestamp, printf } = winston.format;



const myFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}]  ${level}: ${message}`;
  });


  const infoLogger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), myFormat),
    defaultMeta: { service: "index" },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "./logs/info.log", level: "info" }),
    ],
  });
  
  const errorLogger = winston.createLogger({
    level: "error",
    format: combine(timestamp(), myFormat),
    defaultMeta: { service: "index" },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "./logs/error.log", level: "error" }),
    ],
  });



module.exports={infoLogger, errorLogger};