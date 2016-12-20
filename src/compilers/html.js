var fs = require('fs');

/**
 * Given a stream of content, generate a Promise to
 * compile it into HTML
 */
function compileHTML(content, outputfile, cb) {
    return new Promise(function (error, resolve) {
        fs.writeFile(outputfile + '.html', content, function(err, doc) {
            if (err) {
                error(err);
            } else {
                console.log('Successfully compiled HTML!');
                resolve();
            }
        });
    });
}

module.exports = compileHTML;
