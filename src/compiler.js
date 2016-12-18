var fs = require('fs');
var path = require('path');

var bs = require('browser-sync').create();
var juice = require('juice');

var htmlCompiler = require('./compilers/html');
var emlCompiler = require('./compilers/eml');
var resourcemanager = require('./resourcemanager');

/**
 * Generate a Promise chain to call the different
 * compilers
 */
function generateCompilerChain(inline, output, compileTargets) {
    var compilerchain = Promise.resolve();
    if (compileTargets.html) {
        compilerchain.then(function(resolve, reject) {
            htmlCompiler(inline, output);
            resolve();
        });
    }
    if (compileTargets.eml) {
        compilerchain.then(function (resolve, reject) {
            emlCompiler(inline, output);
            resolve();
        });
    }
    return compilerchain;
}

/**
 * compile HTML and move it to the specified directory
 */
function compile(input, outputDir, options, cb) {
    var absInput = path.resolve(input);
    var absOutput = path.resolve(outputDir, 'compiled');
    fs.readFile(input, 'utf8', function(err, contents) {
        var $ = resourcemanager.fetchAssets(contents, path.dirname(absInput), path.dirname(absOutput));
        var html = juice($.html());
        generateCompilerChain(html, absOutput, options.compileTargets)
            .then(cb);
    });
}

/**
 * watch for changes to the specified file and serve the 
 * generated file
 */
function watch(input, outputDir, options) {
    // compile the HTML so that there's something to watch
    compile(input, outputDir, options);
    var absInput = path.resolve(input);
    var absOutput = path.resolve(outputDir);
    bs.watch(absInput, function (event, file) {
        if (event === 'change') {
            compile(input, outputDir, options, function() {
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
