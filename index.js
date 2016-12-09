const fs = require('fs');
const path = require('path');

const bs = require('browser-sync').create();
const juice = require('juice');

bs.watch('src/**/*.*', function (event, file) {
    if (event === 'change') {
        const name = path.basename(file);
        fs.readFile(file,'utf8', function(err, contents) {
            const inline = juice(contents);
            fs.writeFile(path.resolve('.', './dist/' + name), inline, function (err, doc) {
                if (err) throw err;
                console.log(inline);
            });
        });
    }
});

bs.init({
    server: './dist'
});
