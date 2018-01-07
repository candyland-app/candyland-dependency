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
    $ watermark [option]

    Options
      --help, -h        Display help message
      --color, -c       Watermark text color
      --text, -t        Watermark text
      --output, -o      Output file path
      --version, -v     Display installed version

    Examples
      $ watermark --help
      $ watermark -i panda.png -c red
      $ watermark -i unicorns.png -c green -t 'Unicorns'
      $ watermark -i cupcakes.png -c blue -t 'Cupcake' -o cupcake.png
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

module.exports = {addWatermark, helpMessage};
