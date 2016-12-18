var fs = require('fs');
var BuildMail = require('buildmail');

/**
 * Given a stream of content, compile it into an
 * eml file
 */
function compileEml(content, outputfile) {
    var mail = new BuildMail('text/html').setContent(content);
    mail.createReadStream().pipe(fs.createWriteStream(outputfile + '.eml'));
    console.log('Successfully compiled eml!');
}

module.exports = compileEml;
