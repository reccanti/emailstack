var fs = require('fs');
var path = require('path');

var cheerio = require('cheerio');
var isValidUrl = require('valid-url');
var BuildMail = require('buildmail');
var nodemailer = require('nodemailer');
var stubTransport = require('nodemailer-stub-transport');

/**
 * Given a stream of content, compile it into an
 * eml file
 */
function compileEml(content, outputfile) {
    return new Promise(function (resolve, error) {
        fs.readdir(path.join(path.dirname(outputfile), 'assets'), function (err, files) {
            if (err) {
                error(err);
            }
            var mail = new BuildMail('multipart/related');
            mail.createChild('text/html')
                    .setContent(content);

            mail.createReadStream().pipe(fs.createWriteStream(outputfile + '.eml'));
            resolve();
        });
    });
}

function compileEmlNodemail(content, outputfile) {
    var transport = nodemailer.createTransport(stubTransport());
    var mailData = {
        from: '"Ben Wilcox" <reccanti@gmail.com>',
        to: ['reccanti@gmail.com'],
        attachments: [
            {
                filename: 'hello.jpg',
                path: path.resolve('./demo/assets/joker.jpg'),
                cid: '<joker.jpg@test.com>'
            }
        ]
    };
    var $ = cheerio.load(content);
    $('img').each(function (index, elem) {
        var $filepath = $(elem).attr('src');
        if ($filepath && !(isValidUrl.isWebUri($filepath))) {
            var filename = path.basename($filepath);
            var filepath = path.resolve(path.join(path.dirname(outputfile), filename));
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
    return transport.sendMail(mailData)
        .then(function(info) {
            return new Promise(function (resolve, reject) {
                fs.writeFile(outputfile + '.eml', info.response.toString(), function(err, doc) {
                    if (err) {
                        reject(err)
                    } else {
                        console.log('Successfully compiled eml!');
                        resolve();
                    }
                })
            });
        });
}

module.exports = compileEmlNodemail;
