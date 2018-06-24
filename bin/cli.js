#!/usr/bin/env node

/*!
  Pa11y CI configurator.

  Commandline tools to initialise configuration file(s) for 'pa11y-ci'.

  NOTE: This is NOT an official part of pa11y or pa11y-ci!

  USAGE:
    bin/cli.js --pkg   # Extract pa11y-ci configuration from 'package.json' and write to file.
    bin/cli.js --dump  # Dump a set of useful defaults for pa11y-ci to file (.pa11yci.json) (TODO).
    bin/cli.js --init  # Run a wizard, similar to `npm init` (TODO).

  © Nick Freear, 22-June-2018.

  License: MIT or LGPL-3.0.
*/
'use strict';

const FS = require('fs');
const PKG_KEY = 'pa11yCiConfig';
const CONFIG_FILE = process.cwd() + '/.pa11yci.json';

const PKG_PATH = process.cwd() + '/package.json';
const ARG = process.argv[ process.argv.length - 1 ];

console.warn('Pa11y CI configurator.');
console.warn('\nCommand:', ARG);

if (ARG === '--pkg') {
  const PKG = require(PKG_PATH);
  const OPT = PKG[ PKG_KEY ];
  const CFG = {};

  console.warn('package.json:', PKG_PATH);
  console.warn('Extracted configuration:', OPT);

  CFG[ '#' ] = 'Automated accessibility testing ~ https://github.com/pa11y/ci';
  CFG.defaults = OPT && OPT.defaults ? OPT.defaults : {};
  CFG.urls = OPT && OPT.urls ? OPT.urls : [];

  const json = JSON.stringify(CFG, null, 2);

  FS.writeFile(CONFIG_FILE, json, function (err) {
    if (err) throw err;
    console.warn('\nConfiguration saved: ' + CONFIG_FILE);
  });
} else {
  console.error('Warning. Option / command not yet implemented!');
}
