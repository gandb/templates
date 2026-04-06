export class EmailService{
    sendEmail(to: string, subject:string,  message: string) {
        console.log(`Enviando email para ${to}: ${message}`);
    }
}