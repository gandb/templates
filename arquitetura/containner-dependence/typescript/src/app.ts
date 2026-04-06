import { Container } from "./container";
import { EmailService } from "./services/email-services";

function main() {
    
    const container = new Container();
    container.register("EmailService", EmailService);

    const emailService:EmailService = container.resolve("EmailService");

    emailService.sendEmail("gandnegro@gmail.com","Convite para evento","Você está convidado para reunião!");
}

main();