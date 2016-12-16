var fs = require('fs');
var path = require('path');

var bs = require('browser-sync').create();
var juice = require('juice');

// bs.watch('src/**/*.*', function (event, file) {
//     if (event === 'change') {
//         var name = path.basename(file);
//         fs.readFile(file,'utf8', function(err, contents) {
//             var inline = juice(contents);
//             fs.writeFile(path.resolve('.', './dist/' + name), inline, function (err, doc) {
//                 if (err) throw err;
//                 console.log(inline);
//             });
//         });
//     }
// });

// bs.init({
//     server: './dist'
// });

/**
 * compile HTML and move it to the specified directory
 */
function compile(input, outputDir) {
    var absInput = path.resolve(input);
    var absOutput = path.resolve(outputDir, 'compiled.html');
    fs.readFile(input, 'utf8', function(err, contents) {
        var inline = juice(contents);
        fs.writeFile(absOutput, inline, function(err, doc) {
            if (err) throw err;
        });
    });
}

module.exports.compile = compile;
