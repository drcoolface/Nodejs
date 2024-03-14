import fs from 'fs';
import path from 'path';
import mjml2html from 'mjml';
import { transporter } from '../configs/mailerConfig';
import { startOfDay, endOfDay, format } from 'date-fns';
import AppDataSource from '../configs/ormconfig';
import { Event } from '../entity/Event';
import dotenv from 'dotenv';
dotenv.config();
export class EmailService 
{
    static async sendRegistrationConfirmation(userEmail: string, userName: string, eventName: string): Promise<void> {
        const templatePath = path.join(__dirname, '../templates/regConfirm.mjml');
        let template = fs.readFileSync(templatePath, 'utf-8');

        template = template.replace('{{name}}', userName);
        template = template.replace('{{eventName}}', eventName);
       
        const { html } = mjml2html(template);

        await transporter.sendMail({
            from: '"Event Organizer" <organizer@example.com>',
            to: userEmail,
            subject: 'Event Registration Confirmation',
            html: html,
        });
    }
    static async sendTodaysEvents(): Promise<void> {
        const todayStart = startOfDay(new Date());
        const todayEnd = endOfDay(new Date());


        const events = await AppDataSource.getRepository(Event)
            .createQueryBuilder("event")
            .where("event.date >= :todayStart AND event.date <= :todayEnd", { todayStart, todayEnd })
            .getMany();

        if (events.length === 0) {
            console.log("No events for today.");
            return;
        }

        const templatePath = path.join(__dirname, '../templates/adminEvent.mjml');
        let template = fs.readFileSync(templatePath, 'utf-8');

        const eventsDetails = events.map(event =>
            `<mj-text font-size="16px">${event?.title} - ${format(event.date, 'yyyy-MM-dd')}</mj-text>`
        ).join('<mj-text>-----</mj-text>');

        // Replace the placeholder in the template with the actual events details
        template = template.replace('<!--eventsPlaceholder-->', eventsDetails);

        const { html } = mjml2html(template);

        await transporter.sendMail({
            from: '"Event Organizer" <organizer@example.com>',
            to: "admin@gmail.com",
            subject: "Today's Events",
            html: html,
        });
    }
}
    
