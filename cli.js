#!/usr/bin/env node
'use strict';
const meow = require('meow');
const index = require('./index');

const watermark = index.watermarkCLI;
const helpMessage = index.helpMessage;

const cli = meow(helpMessage, {
  flags: {
    input: {
      type: 'string',
      alias: 'i'
    },
    output: {
      type: 'string',
      alias: 'o'
    },
    color: {
      type: 'string',
      alias: 'c'
    },
    text: {
      type: 'string',
      alias: 't'
    }
  }
});

watermark(cli.input[0], cli.flags);
