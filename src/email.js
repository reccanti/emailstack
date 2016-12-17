const fs = require('fs');
const BuildMail = require('buildmail');

fs.readFile('dist/test.html', 'utf8', function (err, contents) {
    const mail = new BuildMail('text/html').setContent(contents);
    mail.createReadStream().pipe(fs.createWriteStream('dist/test.eml'));
});
