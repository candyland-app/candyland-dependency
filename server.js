#!/usr/bin/env node
'use strict';
const path = require('path');
const ms = require('ms');
const fs = require('fs-extra');
const chalk = require('chalk');
const multer = require('multer');
const express = require('express');
const progress = require('progress-stream');
const watermark = require('./index');

const join = path.join;
const resolve = path.resolve;

const red = chalk.bold.red;     // Red bold text
const green = chalk.bold.green; // Green bold text
const yellow = chalk.bold.yellow;   // Yellow bold text
const magenta = chalk.bold.magenta; // Magenta bold text

const binDir = resolve(__dirname, 'bin');
const uploadsDir = resolve(__dirname, 'uploads');
const warningTxtPath = join(binDir, 'warning.txt');

const app = express();

function getExtension(file) {
  let res;
  // Get the filename extension through mimetype
  switch (file.mimetype) {
    case 'image/jpeg':
      res = '.jpg';
      break;

    case 'image/png':
      res = '.png';
      break;

    case 'image/gif':
      res = '.gif';
      break;

    default:
      // Print a large warning on non-image input
      console.log(red('Invalide Filetype: ' + file.mimetype));
      console.log(red(fs.readFileSync(warningTxtPath, 'utf8')));
      process.exit(1);
  }
  return res;
}

const storage = multer.diskStorage({
  // Saving location on server
  destination(req, file, cb) {
    if (!fs.existsSync(uploadsDir)) {
      // Build the `uploads` directory
      fs.mkdirSync(uploadsDir);
      console.log(green('✔ Uploads Directory Created'));
    }
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    // Save under new unique name
    cb(null, Date.now() + getExtension(file));
  }
});

// Serve all static under root
app.use(express.static('./'));

// Initialize multer
const upload = multer({
  storage
}).fields([
  // Fields to accept multiple types of uploads
  {
    name: 'fileName',
    maxCount: 1
  }
]);

app.post('/uploads', (req, res) => {
  const prog = progress({
    time: 100
  }, function (progress) {
    // Check uploading progress every 100 ms
    const length = this.headers['content-length'];
    const transf = progress.transferred;
    const result = Math.round(transf / length * 100) + ' %';
    // Display uploading progress
    console.log(yellow('• Uploading Progress: ' + result));
  });
  // Switch for progress tracking
  req.pipe(prog);
  prog.headers = req.headers;

  upload(prog, res, err => {
    // Initialize process
    if (err) {
      console.error(err.message);
    } else if (prog.files.fileName) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      // Get watermark text
      const watermarkText = prog.body.watermark;
      // Get image file path
      const imageFilePath = prog.files.fileName[0].path;
      // Get original file name
      const originalFileName = prog.files.fileName[0].originalname;
      // Watermarking options
      const options = {
        text: watermarkText,
        dstPath: imageFilePath,
        'override-image': true,
        color: 'rgb(255, 0, 0)'
      };
      // Add watermark on image
      watermark.addWatermark(imageFilePath, options.dstPath, options.text, options.color);
      // Minor delay to sync image display
      setTimeout(() => {
        // Display image
        res.write('<img style=\'max-width:400px\' src=\'' + imageFilePath + '\'/>');
        res.end();
      }, ms('2s'));
      console.log(green('✔ Image Uploaded: ') + magenta(originalFileName));
    }
  });
});

app.listen(3000, () => {
  // Initialize local server
  console.log(green('✔ Server Initialized @') + magenta(' http://localhost:3000'));
});
