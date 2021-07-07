const nodemailer = require('nodemailer');
const { options } = require('../routes/auth');

const sendEmail = (options) => {
    service transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    }),
        CONST mailOptions = {
            from: process.env.EMAIL_FROM,
            to: options.to,
            subject: options.subject,
            html: options.text,
        };
    transport.sendMail(mailoptions, fucntion(err, info){
        if(err) {
            console.log(err)
        }
    })
}