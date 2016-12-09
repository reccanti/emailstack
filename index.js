const bs = require('browser-sync').create();
const juice = require('juice');

bs.watch('src/**/*.*').on('change', bs.reload);

bs.init({
    server: './src'
});
