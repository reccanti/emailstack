var fs = require('fs');
var path = require('path');

var bs = require('browser-sync').create();
var juice = require('juice');

var htmlCompiler = require('./compilers/html');
var emlCompiler = require('./compilers/eml');

/**
 * compile HTML and move it to the specified directory
 */
function compile(input, outputDir, cb) {
    // check to see if an output directory was passed
    if (!(outputDir instanceof String) && typeof outputDir !== 'string') {
        if (typeof outputDir === 'function') {
            cb = outputDir;
        }
        outputDir = '.';
    }
    var absInput = path.resolve(input);
    var absOutput = path.resolve(outputDir, 'compiled');
    fs.readFile(input, 'utf8', function(err, contents) {
        var inline = juice(contents);
        htmlCompiler(inline, absOutput, cb);
        emlCompiler(inline, absOutput);
    });
}

/**
 * watch for changes to the specified file and serve the 
 * generated file
 */
function watch(input, outputDir) {
    // check to see if an output directory was passed
    if (!(outputDir instanceof String) && typeof outputDir !== 'string') {
        outputDir = '.';
    }
    // compile the HTML so that there's something to watch
    compile(input, outputDir);
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
