const { Router } = require('express');
const nodemailer = require('nodemailer');
const router = Router();

router.post('/send-email', async (req, res) => {
    console.log("Request listened");
    console.log(req.body);
    const { nombre, apellido, email, telefono, fechaNacimiento, detalle } = req.body;
    const contentHTML = `
    <h2>Información del usuario</h2>
    <ul>
        <li> <strong>Nombre:</strong> ${nombre}</li>
        <li> <strong>Apellido:</strong> ${apellido}</li>
        <li> <strong>E-mail:</strong> ${email}</li>
        <li> <strong>Teléfono:</strong> ${telefono}</li>
        <li> <strong>Fecha de nacimiento:</strong> ${fechaNacimiento}</li>
    </ul>
    <br/>
    <br/>
    <h2>Sugerencia</h2>
    <p>${detalle}</p>
    `;

    const contentHTMLforUser = `
    <div>
        <div>

            <div>
                <img style=" margin: 10px auto 20px;
                display: block;" src="https://i.ibb.co/N1htzDB/logo.png" alt="logo" />
            </div>
            <h2 style="text-align: center;">Hola ${nombre}, muchas gracias por contactarnos</h2>

            <h4 style="text-align: center;">Muy pronto nos pondremos en contacto contigo, tu opinión es muy importante
                para nosotros</h4>
        </div>
    </div>
    `;
    try {
        var transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
                ciphers: 'SSLv3'
            },
            auth: {
                user: 'knoot@outlook.es',
                pass: 'admin2020kn'
            }
        });
        const info = await transporter.sendMail({
            from: "Knoot-app <knoot@outlook.es>",
            to: "knoot@outlook.es",
            // cc: asesorx[0].ase_nombre + ' <' + asesorx[0].ase_email + '>',
            subject: `Sugerencia de ${nombre} ${apellido}`,
            html: contentHTML
        });

        const info2 = await transporter.sendMail({
            from: "Knoot <knoot@outlook.es>",
            to: email,
            // cc: asesorx[0].ase_nombre + ' <' + asesorx[0].ase_email + '>',
            subject: 'Envío de sugerencia exitosa',
            html: contentHTMLforUser
        });
        console.log("Message Sent", info.response);
        console.log("Message Sent", info2.response);

        res.json({ success: "Correo enviado exitosamente" });
    } catch (error) {
        res.json({ error: "Se produjo un error al intentar enviar el correo, pruebe más tarde" });
    }

});

module.exports = router;