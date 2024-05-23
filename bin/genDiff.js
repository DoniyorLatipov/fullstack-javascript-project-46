#!/usr/bin/env node

const { program } = require('commander');
const difference = require('../index');

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format  [type]', 'output format')
  .action(difference)
  .helpOption('-h, --help', 'output usage information');

program.parse();
