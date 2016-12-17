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
            return yargs.option('watch', {
                alias: 'w',
                describe: 'watch the specified file and compile whenever there is a change',
                type: 'boolean'
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
    if (args.watch) {
        compiler.watch(args.inFile, args.outDir);
    } else {
        compiler.compile(args.inFile, args.outDir);
    }
}
// console.log(args);
