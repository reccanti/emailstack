var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

/**
 * Transfer a file into the output asset directory
 */
function transferFile(inputfilename, assetdir) {
    var outputfilename = path.join(assetdir, path.basename(inputfilename));
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

/**
 * fetch assets and move them to an assets folder
 * change image urls to refer to this directory
 */
function fetchAssets(html, input, output) {
    var inputdir = input;
    var outputdir = output;
    var assetdir = makeAssetDirectory(outputdir);

    var $ = cheerio.load(html);
    $('img').each(function (index, elem) {
        var inputfile = path.join(inputdir, $(elem).attr('src'));
        var outputfile = transferFile(inputfile, assetdir);

        var localfile = path.relative(outputdir, outputfile);
        $(elem).attr('src', localfile);
    });
    return $;
}

module.exports.fetchAssets = fetchAssets;
