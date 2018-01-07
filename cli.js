#!/usr/bin/env node
'use strict';
const meow = require('meow');
const index = require('./index');

const watermark = index.addWatermark;
const helpMessage = index.helpMessage;

const cli = meow(helpMessage, {
  alias: {
    i: 'input',
    c: 'color',
    t: 'text',
    o: 'output',
    h: 'help',
    v: 'version'
  }
});

watermark(cli.flags);
