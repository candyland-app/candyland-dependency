'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');

const resolve = path.resolve;

const green = chalk.bold.green;     // Green bold text
const yellow = chalk.bold.yellow;   // Green bold text

const uploadsDir = resolve(__dirname, '../uploads');    // Uploads directory

if (fs.existsSync(uploadsDir)) {
    // Check if the directory exist
  try {
        // Clean-up
    rimraf.sync(uploadsDir);
    console.log(green('✔ Cleaning up'));
  } catch (err) {
    console.error(err);
  }
} else {
  console.log(yellow('Nothing to clean-up'));
}
