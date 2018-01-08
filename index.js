#!/usr/bin/env node
'use strict';
const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const watermark = require('image-watermark');

const join = path.join;
const resolve = path.resolve;
const extname = path.extname;

const red = chalk.bold.red;     // Red bold text
const green = chalk.bold.green; // Green bold text
const yellow = chalk.bold.yellow; // Yellow bold text
const magenta = chalk.bold.magenta; // Magenta bold text

const binDir = resolve(__dirname, 'bin');
const warningTxtPath = join(binDir, 'warning.txt');

const homeDir = os.homedir();  // User home directory
const redRGB = 'rgb(255, 0, 0)';  // Default watermark text color
const defaultText = 'Candyland Watermark';  // Default watermark text
const defaultOuput = 'candyland-watermark.png';  // Default output name
const defaultOuputPath = join(homeDir, defaultOuput);  // Default output path

const helpMessage = `
  Usage
    $ node cli.js [<options> ...]

    Options
      --help, -h        Display help message
      --input, -i       Input file path
      --output, -o      Output file path
      --text, -t        Watermark text
      --color, -c       Watermark RGB color value
      --version, -v     Display installed version

    Examples
      $ node cli.js --help
      $ node cli.js -i dogo.png -t 'Super Dogo!'
      $ node cli.js -i dogo.png -o super-dogo.png -t 'Super Dogo!'
      $ node cli.js -i dogo.png -t 'Super Dogo!' -c 'rgba(0, 255, 0)'
`;

function invalidInput(fileType) {
  // Display error message on non-image input
  console.log(red('Invalide Filetype: ' + fileType));
  console.log(red(fs.readFileSync(warningTxtPath, 'utf8')));
  process.exit(1);
}

function validateFile(inputFile) {
  // Validate whether the input file is an image
  let extension;
  switch (extname(inputFile)) {
    // Check the file extension
    case '.jpg':
    case '.jpeg':
      extension = '.jpg';
      break;

    case '.png':
      extension = '.png';
      break;

    case '.gif':
      extension = '.gif';
      break;

    default:
      // Print a large warning on non-image input
      invalidInput(extname(inputFile));

  }
  return extension;
}

function addWatermark(inputFile, outputFile, text, color) {
  // Get user options
  const textColor = color || redRGB;
  const watermarkText = text || defaultText;
  const outputFilePath = outputFile || defaultOuputPath;
  // Collect user options
  const userOptions = {
    color: textColor,
    text: watermarkText,
    dstPath: outputFilePath
  };
  // Check whethe the input file exists
  if (fs.existsSync(inputFile)) {
    // Check the file type
    const fileType = validateFile(inputFile);
    console.log(yellow('Input Image Type: ') + magenta(fileType));
    watermark.embedWatermarkWithCb(inputFile, userOptions, error => {
      if (error) {
        console.log(red(error.message));
      } else {
        console.log(green('✔ Created File @ ') + magenta(userOptions.dstPath));
        console.log(green('✔ Watermark Embeded: ') + magenta(userOptions.text));
        return 0;
      }
    });
  } else {
    console.log(red('Unable to locate input file: ' + inputFile));
    process.exit(1);
  }
}

const watermarkCLI = (input, flags) => {
  // Parse & pack CLI agruments
  const argsCLI = {
    inputFile: flags.input,
    outputFile: flags.output,
    watermarkText: flags.text,
    watermarkColor: flags.color
  };
  // Call addWatermark() on given arguments
  addWatermark(argsCLI.inputFile, argsCLI.outputFile, argsCLI.watermarkText, argsCLI.watermarkColor);

  return 0;
};

module.exports = {watermarkCLI, addWatermark, helpMessage};
