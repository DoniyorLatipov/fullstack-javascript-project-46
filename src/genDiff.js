const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1> <filepath2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format  [type]', 'output format')
  .helpOption('-h, --help', 'output usage information');

program.parse();
