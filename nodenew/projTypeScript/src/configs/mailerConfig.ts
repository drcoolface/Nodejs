import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();


export const mailerConfig = {
    host: process.env.MAILTRAP_HOST,
    port: Number(process.env.MAILTRAP_PORT),
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    },
};

export const transporter = nodemailer.createTransport(mailerConfig);