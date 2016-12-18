var compiler = require('./compiler');

/*
 * Gather command line arguments and generate
 * command line instructions
 */
var args = require('yargs')
    // .usage('Usage: $0 <command> [options]')
    .command(
        'compile <inFile> [outDir]',
        'Compile an HTML file into a specified format, inline HTML by default.',
        function(yargs) {
            return yargs.options({
                'c': {
                    alias: 'compileTargets',
                    array: true,
                    choices: ['html', 'eml'],
                    default: ['html'],
                    describe: 'The types of files to output',
                    type: 'string'
                },
                'w': {
                    alias: 'watch',
                    describe: 'Watch the specified file and compile whenever there is a change',
                    type: 'boolean'
                }
            });
        }
    )
    .example('$0 compile email.html')
    .example('$0 compile email.html --watch')
    .help('h')
    .alias('h', 'help')
    .argv;

/*
 * call the appropriate functions based on the arguments
 */
if (args._[0] === 'compile') {
    options = {
        compileTargets: {}
    };
    for (var i = 0; i < args.compileTargets.length; i++) {
        options.compileTargets[args.compileTargets[i]] = true;
    }
    if (args.watch) {
        compiler.watch(args.inFile, args.outDir || '.', options);
    } else {
        compiler.compile(args.inFile, args.outDir || '.', options);
    }
}
// console.log(args);
