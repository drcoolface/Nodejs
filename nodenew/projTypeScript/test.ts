import { transporter } from './src/configs/mailerConfig';

async function sendTestEmail() {
    await transporter.sendMail({
        from: '"Test User" <test@example.com>', // sender address
        to: "recipient@example.com", // list of receivers
        subject: "Hello from Mailtrap", // Subject line
        text: "Hello World?", // plain text body
        html: "<b>Hello World?</b>", // HTML body content
    });

    console.log('Test email sent successfully');
}

sendTestEmail().catch(console.error);
