"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
const email_services_1 = require("./services/email-services");
function main() {
    const container = new container_1.Container();
    container.register("EmailService", email_services_1.EmailService);
    const emailService = container.resolve("EmailService");
    emailService.sendEmail("gandnegro@gmail.com", "Convite para evento", "Você está convidado para reunião!");
}
main();
//# sourceMappingURL=app.js.map