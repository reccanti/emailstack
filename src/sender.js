var fs = require('fs');
var path = require('path');

var inquirer = require('inquirer');
var nodemailer = require('nodemailer');
var isValidUrl = require('valid-url');
var cheerio = require('cheerio');

/**
 * a function to send an HTML email to
 * a batch of email addresses
 */
function send(file, recipients) {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your gmail email account?',
            name: 'email'
        },
        {
            type: 'password',
            message: 'What is the password for this account?',
            name: 'password'
        }
    ])
    .then(function (data) {
        fs.readFile(path.resolve(file), 'utf8', function(err, content) {
            var mailData = {
                from: data.email,
                to: recipients,
                attachments: []
            };
            var $ = cheerio.load(content);
            $('img').each(function (index, elem) {
                var $filepath = $(elem).attr('src');
                if ($filepath && !(isValidUrl.isWebUri($filepath))) {
                    var filename = path.basename($filepath);
                    var filepath = path.resolve($filepath);
                    var cid = path.basename($filepath) + '@test.com';
                    mailData.attachments.push({
                        filename: filename,
                        path: filepath,
                        cid: cid
                    });
                    $(elem).attr('src', 'cid:' + cid);
                }
            });
            mailData.html = $.html();
            var smtpconfig = {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: data.email,
                    pass: data.password
                }
            };
            transporter = nodemailer.createTransport(smtpconfig);
            transporter.sendMail(mailData, function(info) {
                console.log('email sent!');
            });
        });
    });
}

module.exports.send = send; 
