var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: 'darkbizarre@yandex.ru',
        pass: 'password'
    }
});

module.exports = transporter;