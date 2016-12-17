var fs = require('fs');

/**
 * Given a stream of content, compile it into an
 * HTML file
 */
function compileHTML(content, outputfile, cb) {
    fs.writeFile(outputfile, content, function(err, doc) {
        if (err) throw err;
        console.log('Successfully compiled HTML');
        if (cb) cb();
    });
}

module.exports = compileHTML;
