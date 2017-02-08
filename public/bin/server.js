#!/usr/bin/env node

// register server-side babel support
require('babel-register');

require('css-modules-require-hook/preset');

global.__CLIENT__ = false;
global.__SERVER__ = true;

// start the server app
require('../../src/server');
