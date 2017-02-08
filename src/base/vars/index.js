const _mediaQueries = require('./media-widths.js');
const _sizes = require('./sizes.js');
const _colors = require('./colors.js');
const _fonts = require('./fonts.js');

const _vars = Object.assign(_mediaQueries, _sizes, _colors, _fonts);

module.exports = _vars;
