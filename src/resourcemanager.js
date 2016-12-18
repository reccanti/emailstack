var fs = require('fs');
var path = require('path');
var htmlparser = require('htmlparser2');

var inputdir = '' 
    ,outputdir = ''
    ,assetdir = '';

// get the current file directory
// find the location of the file relative to that directory

/**
 * Initialize the html parser
 */
var parser = new htmlparser.Parser({
    onopentag: function(name, attrs) {
        if (name === 'img' && attrs.src) {
            var inputfile = path.join(inputdir, attrs.src);
            var outputfile = transferFile(inputfile, assetdir);
            // console.log(htmlparser.DomUtils.replaceElement);
            attrs.src = outputfile;
        }
    }
}, {decodeEntities: true});

/**
 * Transfer a file into the output asset directory
 */
function transferFile(inputfilename, assetdir) {
    var outputfilename = path.join(assetdir, path.basename(inputfilename));
    // console.log(inputfilename);
    // console.log(outputfilename);
    fs.createReadStream(inputfilename).pipe(fs.createWriteStream(outputfilename));
    return outputfilename;
}

/**
 * Create the asset directory if it doesn't already exist
 */
function makeAssetDirectory(outputdir) {
    var assetdir = path.join(outputdir, 'assets');
    if (!fs.existsSync(assetdir)) {
        fs.mkdirSync(assetdir);
    }
    return assetdir;
}

/*
how this should work

1) get html
2) find asset url
3) create an asset folder (if it doesn't already exist)
4) copy elements into that folder
5) change the asset url in the html into the new location

*/

function fetchAssets(html, input, output) {
    inputdir = input;
    outputdir = output;
    assetdir = makeAssetDirectory(outputdir);
    parser.write(html);
    parser.end();
}

module.exports.fetchAssets = fetchAssets;
