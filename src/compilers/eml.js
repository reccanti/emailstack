var fs = require('fs');
var path = require('path');

var BuildMail = require('buildmail');

/**
 * Given a stream of content, compile it into an
 * eml file
 */
function compileEml(content, outputfile) {
    return new Promise(function (error, resolve) {
        fs.readdir(path.join(path.dirname(outputfile), 'assets'), function (err, files) {
            if (err) {
                error(err);
            }
            var mail = new BuildMail('multipart/related');
            mail.createChild('text/html')
                    .setContent(content);

            mail.createReadStream().pipe(fs.createWriteStream(outputfile + '.eml'));
            console.log('Successfully compiled eml!');
            resolve();
        });
    });
}

module.exports = compileEml;
