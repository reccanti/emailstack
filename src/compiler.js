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
function generateCompilerChain(inline, input, output, compileTargets) {
    var compilers = [];
    if (compileTargets.html) {
        compilers.push(htmlCompiler(inline, input, output));
    }
    if (compileTargets.eml) {
        compilers.push(emlCompiler(inline, input, output));
    }
    return Promise.all(compilers);
}

/**
 * compile HTML and move it to the specified directory
 */
function compile(input, outputDir, options, cb) {
    var absInput = path.resolve(input);
    var absOutput = path.resolve(outputDir, 'compiled');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    fs.readFile(input, 'utf8', function(err, contents) {
        var $ = resourcemanager.fetchAssets(contents, path.dirname(absInput), path.dirname(absOutput));
        var html = juice($.html());
        generateCompilerChain(html, absInput, absOutput, options.compileTargets)
            .then(cb);
    });
}

/**
 * A promise version of the compile function - TODO merge together
 */
function compilePromise(input, outputDir, options) {
    var absInput = path.resolve(input);
    var absOutput = path.resolve(outputDir, 'compiled');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    return new Promise(function (resolve, error) {
        fs.readFile(input, 'utf8', function(err, contents) {
            if (err) {
                error(err);
                return;
            }
            var $ = resourcemanager.fetchAssets(contents, path.dirname(absInput), path.dirname(absOutput));
            var html = juice($.html());
            resolve(html);
        });
    })
    .then(function (html) {
        generateCompilerChain(html, absInput, absOutput, options.compileTargets);
    });
}

/**
 * watch for changes to the specified file and serve the 
 * generated file
 */
function watch(input, outputDir, options) {
    // compile the HTML so that there's something to watch
    var absInput = path.resolve(input);
    var absOutput = path.resolve(outputDir);
    var watch = compilePromise(input, outputDir, options).then(function () {
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
    });
}

module.exports.compile = compile;
module.exports.watch = watch;
