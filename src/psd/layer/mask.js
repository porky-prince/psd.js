// Generated by CoffeeScript 1.12.7
var Mask;

Mask = require('../mask');

module.exports = {
  parseMaskData: function() {
    return this.mask = new Mask(this.file).parse();
  }
};
