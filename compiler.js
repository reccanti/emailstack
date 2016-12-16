var fs = require('fs');
var path = require('path');

var bs = require('browser-sync').create();
var juice = require('juice');

/**
 * compile HTML and move it to the specified directory
 */
function compile(input, outputDir, cb) {
    var absInput = path.resolve(input);
    var absOutput = path.resolve(outputDir, 'compiled.html');
    fs.readFile(input, 'utf8', function(err, contents) {
        var inline = juice(contents);
        fs.writeFile(absOutput, inline, function(err, doc) {
            if (err) throw err;
            console.log('compiled!');
            if (cb) cb(); 
        });
    });
}

/**
 * watch for changes to the specified file and serve the 
 * generated file
 */
function watch(input, outputDir) {
    var absInput = path.resolve(input);
    var absOutput = path.resolve(outputDir);
    bs.watch(absInput, function (event, file) {
        if (event === 'change') {
            compile(input, outputDir, function() {
                bs.reload();
            });
        }
    });
    bs.init({
        server: {
            baseDir: absOutput,
            index: 'compiled.html'
        }
    });
}

module.exports.compile = compile;
module.exports.watch = watch;
