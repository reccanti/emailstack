var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
var smtpTransport = require('nodemailer-smtp-transport');
var SMTPServer = require('smtp-server').SMTPServer;

var server = new SMTPServer({
    logger: true
});
// server.listen(25);
server.listen(25, '127.0.0.1', function () {
    console.log(arguments)
    var transporter = nodemailer.createTransport(smtpTransport({
        host: 'localhost',
        logger: true,
        debug: true
    }));

    var mailData = {
        from: 'test@example.com',
        to: '<reccanti@gmail.com>',
        html:  '<p>Hello</p>'
    };

    transporter.sendMail(mailData, function () {
        console.log('done');
    });

    server.close();
});

// connection.connect(function () {
//         connection.send({
//         from: 'test@example.com',
//         to: '<reccanti@gmail.com>'
//     }, 'testing', function () {
//         console.log('done')
//     });
// });

// var mailData = ;
// // var transporter = nodemailer.createTransport(directTransport({
// //     name: '100.15.66.165',
// //     logger: true,
// //     debug: true,
// //     // port: 465,
// // }));
// var transporter = nodemailer.createTransport('direct:?name=100.15.66.165');

// transporter.sendMail(mailData, function() {
//     console.log('done');
// });
